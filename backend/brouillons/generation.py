from flask import Blueprint, jsonify, request
from modeles.models import Projet
from database import get_db
import os
from core import (
    generateur,
    normalize_model,
    fabrique_blueprint,
    projet_dir,
    ensure_dir,
    
)

generation_bp = Blueprint("generation", __name__, url_prefix="/api/generation")


def generate_backend_for_projet(projet_id, models):

   
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
        
    models = [normalize_model(m) for m in models]
      

    # 1️⃣ models.py (liste de modèles)
    generateur(
        template_name="modele.py.jinja",
        contexte={"models": models},
        chemin_sortie=modeles_path,
        nom_fichier="models.py"
    )

    # 2️⃣ routes CRUD (1 modèle à la fois)
    for model in models:
        generateur(
            template_name="route_api.py.jinja",
            contexte={"model": model},
            chemin_sortie=routes_path,
            nom_fichier=f"{model['nom'].lower()}.py"
        )

    # 3️⃣ app.py + blueprints
    blueprints = []

    for model in models:
        blueprints.append({
            "nom": model["nom"].lower(),
            "bp": fabrique_blueprint(model)
        })


    generateur(
        template_name="app.py.jinja",
        contexte={"blueprints": blueprints},
        chemin_sortie=base_path,    
        nom_fichier="app.py"
    )

    # 4️⃣ fichiers système (AUCUN model ici)
    for tpl, fname in [
        ("config.py.jinja", "config.py"),
        ("database.py.jinja", "database.py"),
        ("extensions.py.jinja", "extensions.py"),
    ]:
        generateur(
            template_name=tpl,
            contexte={"nom": projet.auteur},   # ✅ volontairement vide
            chemin_sortie=base_path,
            nom_fichier=fname
        )


@generation_bp.post("/<int:projet_id>")
def generate(projet_id):
    try:
        data = request.get_json()
        modele = data.get("modele")
        generate_backend_for_projet(projet_id, models=modele)
        return jsonify({"message": "Backend généré avec succès"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500



