from flask import Blueprint, jsonify, request
from modeles.models import Projet, Data

from database import get_db
from core import (
    generateur,
    fabrique_blueprint,
    projet_dir,
    ensure_dir,
    type_utilises,
    normalize_relations,
    parseur_modele,
)
from mapping import TYPE_MAPPING


# creation du blueprint_projet
projet_bp = Blueprint("projets", __name__, url_prefix="/api/projets")


# creation  d'un CRUD
# Fonction de génération du backend pour un projet donné


def fabrique_database_url(db):
    if db["type"] == "sqlite":
        return "sqlite:///database.db"

    if db["type"] == "postgresql":
        return (
            f"postgresql+psycopg2://{db['username']}:"
            f"{db['password']}@"
            f"{db['host']}:"
            f"{db['port']}/"
            f"{db['database']}"
        )

    if db["type"] == "mysql":
        return (
            f"mysql+pymysql://{db['username']}:"
            f"{db['password']}@"
            f"{db['host']}:"
            f"{db['port']}/"
            f"{db['database']}"
        )


def generate_backend_for_projet(projet_id, raw_schema, base_de_donnees, session, jwt):

    # ⚠️ garder la session ouverte pendant TOUTE l'utilisation ORM
    with get_db() as session_db:
        projet = session_db.query(Projet).filter_by(id=projet_id).first()

        if not projet:
            raise ValueError("Projet introuvable")

        nom_dossier = f"{projet.nom.lower().replace(' ', '_')}"
        base_path = projet_dir(nom_dossier)

        # Arborescence
        modeles_path = ensure_dir(f"{base_path}/modeles")
        routes_path = ensure_dir(f"{base_path}/routes")
        erreurs_path = ensure_dir(f"{base_path}/erreurs")
        utils_path = ensure_dir(f"{base_path}/utils")
        schemas_path = ensure_dir(f"{base_path}/schemas")

        # Construction des modèles depuis la DB

    # schemas = [normalisation_model(model=m, type_mapping=TYPE_MAPPING, cible="attributs") for m in raw_schema]

    schemas = [
        parseur_modele(schema=schema, type_mapping=TYPE_MAPPING)
        for schema in raw_schema
    ]

    # Extraction des types utilisés
    types_utilises = type_utilises(schemas)

    # 1️⃣ models.py (liste de modèles)
    relations = normalize_relations(models=schemas)
    generateur(
        template_name="modele.py.jinja",
        contexte={
            "models": schemas,
            "type_utilises": types_utilises,
            "relations": relations,
        },
        chemin_sortie=modeles_path,
        nom_fichier="models.py",
    )

    # recuperation de la session

    # 2️⃣ routes CRUD (1 modèle à la fois)

    for model in schemas:
        generateur(
            template_name="route_api.py.jinja",
            contexte={
                "model": model,
                "relations": model.get("relations", []),
                "session": session,
                "jwt": jwt,
            },
            chemin_sortie=routes_path,
            nom_fichier=f"{model['nom'].lower()}.py",
        )

    # 3️⃣ app.py + blueprints
    blueprints = []

    for model in schemas:
        blueprints.append(
            {"nom": model["nom"].lower(), "bp": fabrique_blueprint(model)}
        )

    generateur(
        template_name="app.py.jinja",
        contexte={"blueprints": blueprints, "nom": projet.auteur, "session": session},
        chemin_sortie=base_path,
        nom_fichier="app.py",
    )

    # 4️⃣ database.py (isolée, explicite)

    database_url = fabrique_database_url(base_de_donnees)
    generateur(
        template_name="database.py.jinja",
        contexte={
            "nom": projet.auteur,
            "database_config": base_de_donnees,
            "database_url": database_url,
            "database_type": base_de_donnees["type"],
        },
        chemin_sortie=base_path,
        nom_fichier="database.py",
    )

    # 5️⃣ fichiers système (AUCUN model ici)
    for tpl, fname in [
        ("extensions.py.jinja", "extensions.py"),
    ]:
        generateur(
            template_name=tpl,
            contexte={"nom": projet.auteur},  # ✅ volontairement vide
            chemin_sortie=base_path,
            nom_fichier=fname,
        )

    # generation de config.py
    generateur(
        template_name="config.py.jinja",
        contexte={
            "nom": projet.auteur,
            "session": session,
        },
        chemin_sortie=base_path,
        nom_fichier="config.py",
    )
    # generation du fichier handle_erreurs
    generateur(
        template_name="handle_erreurs.py.jinja",
        contexte={
            "nom": projet.auteur,
        },
        chemin_sortie=erreurs_path,
        nom_fichier="handle_erreurs.py",
    )

    # generation du fichier utiles.py
    generateur(
        template_name="utils.py.jinja",
        contexte={
            "nom": projet.auteur,
        },
        chemin_sortie=utils_path,
        nom_fichier="utils.py",
    )

    # generation du fichier schema.py
    for model in schemas:
        generateur(
            template_name="schema.py.jinja",
            contexte={
                "model": model,
                "auteur": projet.auteur,
            },
            chemin_sortie=schemas_path,
            nom_fichier=f"{model['nom'].lower()}_schema.py",
        )


# Creation de l'élément


@projet_bp.post("/")
def c_projet():
    with get_db() as session_db:

        # creation du data_get pour recuperer les donnees du POST
        data = request.get_json()

        # creation d'une instance de la classe Projet
        projet = Projet(
            nom=data.get("nom"),
            auteur=data.get("auteur"),
        )

        # Ajout dans la session
        session_db.add(projet)
        session_db.commit()

        return (
            jsonify(
                {
                    "message": "Projet créé avec succès",
                    "statut": True,
                    "nom": projet.nom,
                }
            ),
            201,
        )


@projet_bp.post("/generate/<int:projet_id>")
def generate(projet_id):
    try:
        data = request.get_json()
        modele = data.get("modele")
        base_de_donnees = data.get("databaseConfig")
        session = data.get("session")
        jwt = data.get("jwt")

        if not modele or not base_de_donnees:
            return jsonify({"error": "modele ou databaseConfig manquant"}), 400

        with get_db() as session_db:
            projet = session_db.query(Projet).filter_by(id=projet_id).first()

            if not projet:
                return jsonify({"error": "Projet introuvable"}), 404

            # 🔹 Enregistrement de la config DB
            db_config = Data(
                type=base_de_donnees.get("type"),
                host=base_de_donnees.get("host"),
                port=base_de_donnees.get("port"),
                name=base_de_donnees.get("database"),
                username=base_de_donnees.get("username"),
                password=base_de_donnees.get("password"),
                projet_id=projet.id,
            )

            session_db.add(db_config)
            session_db.commit()
            session_db.refresh(db_config)

        generate_backend_for_projet(
            projet_id,
            raw_schema=modele,
            base_de_donnees=base_de_donnees,
            session=session,
            jwt=jwt,
        )
        return jsonify({"message": "Backend généré avec succès"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500


# route pour voir une ressource
@projet_bp.get("/<int:id>")
def r_projet(id):

    with get_db() as session_db:

        # verification de l'existence de la ressource
        projet = session_db.query(Projet).filter(Projet.id == id).first()

        if not projet:
            return jsonify({"message": "ressource introuvable"}), 404

        return jsonify({"projet": projet.data_projet()}), 200


# route pour voir toutes les ressources
@projet_bp.get("/")
def rr_projet():

    with get_db() as session_db:
        # verification de l'existence de la ressource

        projet_list = session_db.query(Projet).all()
        if not projet_list:
            return jsonify({"message": "ressources introuvable"}), 404

        return jsonify({"projets": Projet.list_data(projet_list)}), 200


# route pour supprimer une ressource
@projet_bp.delete("/<int:id>")
def d_projet(id):

    with get_db() as session_db:

        # verification de l'existence de la ressource
        projet = session_db.query(Projet).filter(Projet.id == id).first()
        if not projet:
            return jsonify({"message": "ressource introuvable"}), 404

        session_db.delete(projet)
        session_db.commit()

        return jsonify({"message": "ressource supprimée avec succes"}), 200
