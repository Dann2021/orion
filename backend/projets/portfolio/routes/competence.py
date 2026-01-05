from flask import Blueprint, jsonify, request
from modeles.models import Competence
from database import get_db


# creation du blueprint_competence
competence_bp = Blueprint("competences", __name__, url_prefix="/api/competences")


# creation  d'un CRUD


# Creation de l'élément

@competence_bp.post("/")
def creer_ressource_competence():

    # Ajout du contexte de la session de la base de donnée 
    with get_db() as db:

        # creation du data_get pour recuperer les donnees du POST
        data = request.get_json()

        # creation d'une instance de la classe Competence
        competence = Competence(
            nom=data.get("nom"),
            niveau=data.get("niveau"),
            categorie=data.get("categorie"),
)

        # Ajout dans la session 
        db.add(competence)
        db.commit()

        return jsonify(competence.data_competence()), 201


# route pour voir une ressource
@competence_bp.get("/<int:id>")
def recuperer_ressource_competence(id):

    # Ajout du contexte de la session de la base de donnée 
    with get_db() as db:

        # verification de l'existence de la ressource
        competence = db.query(Competence).filter(Competence.id == id).first()

        if not competence:
            # fermeture de la session 
            return jsonify({"message": "ressource introuvable"}), 404
        
        return jsonify({"competence": competence.data_competence() }), 200




# route pour voir toutes les ressources
@competence_bp.get("/")
def recuperer_ressources_competence():

    # Ajout du contexte de la session de la base de donnée 
    with get_db() as db:

        # verification de l'existence de la ressource
        competence_list = db.query(Competence).all()

        if not competence_list:
            # fermeture de la session 
            return jsonify({"message": "ressources introuvable"}), 404

        return jsonify({"competences": Competence.list_data(competence_list)}), 200




# route pour supprimer une ressource 
@competence_bp.delete("/<int:id>")
def supprimer_ressource_competence(id):

    # Ajout du contexte de la session de la base de donnée 
    with get_db() as db:

        # verification de l'existence de la ressource
        competence = db.query(Competence).filter(Competence.id == id).first()

        if not competence:
            # fermeture de la session 
            return jsonify({"message": "ressource introuvable"}), 404

        db.delete(competence)
        db.commit()
        
        return jsonify({"message": "ressource supprimée avec succes" }), 200





    