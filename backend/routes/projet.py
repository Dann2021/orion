import os
from flask import Blueprint, jsonify, request
from modeles.models import Projet
from database import get_db
from core import (
    generateur,
    normalize_model,
    fabrique_blueprint,
    projet_dir,
    ensure_dir,
    type_utilise,
    normalize_relations,
)
from mapping import TYPE_MAPPING


# creation du blueprint_projet
projet_bp = Blueprint("projets", __name__, url_prefix="/api/projets")


# creation  d'un CRUD


# Fonction de génération du backend pour un projet donné


def generate_backend_for_projet(projet_id, raw_schema):

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

        # Construction des modèles depuis la DB

    schemas = [normalize_model(m) for m in raw_schema]

    # Extraction des types utilisés
    # types_utilises = extraire_type_utilise(schemas, TYPE_MAPPING)
    types_utilises = type_utilise(schemas)

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

    # 2️⃣ routes CRUD (1 modèle à la fois)
    for model in schemas:
        generateur(
            template_name="route_api.py.jinja",
            contexte={"model": model, "relations": model.get("relations", [])},
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
        contexte={"blueprints": blueprints},
        chemin_sortie=base_path,
        nom_fichier="app.py",
    )

    # 4️⃣ fichiers système (AUCUN model ici)
    for tpl, fname in [
        ("config.py.jinja", "config.py"),
        ("database.py.jinja", "database.py"),
        ("extensions.py.jinja", "extensions.py"),
    ]:
        generateur(
            template_name=tpl,
            contexte={"nom": projet.auteur},  # ✅ volontairement vide
            chemin_sortie=base_path,
            nom_fichier=fname,
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

        #
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
        generate_backend_for_projet(projet_id, raw_schema=modele)
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
            # fermeture de la session

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
            # fermeture de la session

            return jsonify({"message": "ressource introuvable"}), 404

        session_db.delete(projet)
        session_db.commit()

        return jsonify({"message": "ressource supprimée avec succes"}), 200
