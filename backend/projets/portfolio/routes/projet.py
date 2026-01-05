from flask import Blueprint, jsonify, request
from modeles.models import Projet
from database import get_db


# creation du blueprint_projet
projet_bp = Blueprint("projets", __name__, url_prefix="/api/projets")


# creation  d'un CRUD


# Creation de l'élément

@projet_bp.post("/")
def creer_ressource_projet():

    # Ajout du contexte de la session de la base de donnée 
    with get_db() as db:

        # creation du data_get pour recuperer les donnees du POST
        data = request.get_json()

        # creation d'une instance de la classe Projet
        projet = Projet(
            nom=data.get("nom"),
            description=data.get("description"),
            image=data.get("image"),
            lien_demo=data.get("lien_demo"),
            lien_code=data.get("lien_code"),
            featured=data.get("featured"),
)

        # Ajout dans la session 
        db.add(projet)
        db.commit()

        return jsonify(projet.data_projet()), 201


# route pour voir une ressource
@projet_bp.get("/<int:id>")
def recuperer_ressource_projet(id):

    # Ajout du contexte de la session de la base de donnée 
    with get_db() as db:

        # verification de l'existence de la ressource
        projet = db.query(Projet).filter(Projet.id == id).first()

        if not projet:
            # fermeture de la session 
            return jsonify({"message": "ressource introuvable"}), 404
        
        return jsonify({"projet": projet.data_projet() }), 200




# route pour voir toutes les ressources
@projet_bp.get("/")
def recuperer_ressources_projet():

    # Ajout du contexte de la session de la base de donnée 
    with get_db() as db:

        # verification de l'existence de la ressource
        projet_list = db.query(Projet).all()

        if not projet_list:
            # fermeture de la session 
            return jsonify({"message": "ressources introuvable"}), 404

        return jsonify({"projets": Projet.list_data(projet_list)}), 200




# route pour supprimer une ressource 
@projet_bp.delete("/<int:id>")
def supprimer_ressource_projet(id):

    # Ajout du contexte de la session de la base de donnée 
    with get_db() as db:

        # verification de l'existence de la ressource
        projet = db.query(Projet).filter(Projet.id == id).first()

        if not projet:
            # fermeture de la session 
            return jsonify({"message": "ressource introuvable"}), 404

        db.delete(projet)
        db.commit()
        
        return jsonify({"message": "ressource supprimée avec succes" }), 200





    