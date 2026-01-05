from flask import Blueprint, jsonify, request
from modeles.models import Experience
from database import get_db


# creation du blueprint_experience
experience_bp = Blueprint("experiences", __name__, url_prefix="/api/experiences")


# creation  d'un CRUD


# Creation de l'élément

@experience_bp.post("/")
def creer_ressource_experience():

    # Ajout du contexte de la session de la base de donnée 
    with get_db() as db:

        # creation du data_get pour recuperer les donnees du POST
        data = request.get_json()

        # creation d'une instance de la classe Experience
        experience = Experience(
            poste=data.get("poste"),
            entreprise=data.get("entreprise"),
            date_debut=data.get("date_debut"),
            date_fin=data.get("date_fin"),
            description=data.get("description"),
)

        # Ajout dans la session 
        db.add(experience)
        db.commit()

        return jsonify(experience.data_experience()), 201


# route pour voir une ressource
@experience_bp.get("/<int:id>")
def recuperer_ressource_experience(id):

    # Ajout du contexte de la session de la base de donnée 
    with get_db() as db:

        # verification de l'existence de la ressource
        experience = db.query(Experience).filter(Experience.id == id).first()

        if not experience:
            # fermeture de la session 
            return jsonify({"message": "ressource introuvable"}), 404
        
        return jsonify({"experience": experience.data_experience() }), 200




# route pour voir toutes les ressources
@experience_bp.get("/")
def recuperer_ressources_experience():

    # Ajout du contexte de la session de la base de donnée 
    with get_db() as db:

        # verification de l'existence de la ressource
        experience_list = db.query(Experience).all()

        if not experience_list:
            # fermeture de la session 
            return jsonify({"message": "ressources introuvable"}), 404

        return jsonify({"experiences": Experience.list_data(experience_list)}), 200




# route pour supprimer une ressource 
@experience_bp.delete("/<int:id>")
def supprimer_ressource_experience(id):

    # Ajout du contexte de la session de la base de donnée 
    with get_db() as db:

        # verification de l'existence de la ressource
        experience = db.query(Experience).filter(Experience.id == id).first()

        if not experience:
            # fermeture de la session 
            return jsonify({"message": "ressource introuvable"}), 404

        db.delete(experience)
        db.commit()
        
        return jsonify({"message": "ressource supprimée avec succes" }), 200





    