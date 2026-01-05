from flask import Blueprint, jsonify, request
from modeles.models import Profil
from database import get_db


# creation du blueprint_profil
profil_bp = Blueprint("profils", __name__, url_prefix="/api/profils")


# creation  d'un CRUD


# Creation de l'élément

@profil_bp.post("/")
def creer_ressource_profil():

    # Ajout du contexte de la session de la base de donnée 
    with get_db() as db:

        # creation du data_get pour recuperer les donnees du POST
        data = request.get_json()

        # creation d'une instance de la classe Profil
        profil = Profil(
            bio=data.get("bio"),
            annees_experience=data.get("annees_experience"),
            cv_pdf=data.get("cv_pdf"),
)

        # Ajout dans la session 
        db.add(profil)
        db.commit()

        return jsonify(profil.data_profil()), 201


# route pour voir une ressource
@profil_bp.get("/<int:id>")
def recuperer_ressource_profil(id):

    # Ajout du contexte de la session de la base de donnée 
    with get_db() as db:

        # verification de l'existence de la ressource
        profil = db.query(Profil).filter(Profil.id == id).first()

        if not profil:
            # fermeture de la session 
            return jsonify({"message": "ressource introuvable"}), 404
        
        return jsonify({"profil": profil.data_profil() }), 200




# route pour voir toutes les ressources
@profil_bp.get("/")
def recuperer_ressources_profil():

    # Ajout du contexte de la session de la base de donnée 
    with get_db() as db:

        # verification de l'existence de la ressource
        profil_list = db.query(Profil).all()

        if not profil_list:
            # fermeture de la session 
            return jsonify({"message": "ressources introuvable"}), 404

        return jsonify({"profils": Profil.list_data(profil_list)}), 200




# route pour supprimer une ressource 
@profil_bp.delete("/<int:id>")
def supprimer_ressource_profil(id):

    # Ajout du contexte de la session de la base de donnée 
    with get_db() as db:

        # verification de l'existence de la ressource
        profil = db.query(Profil).filter(Profil.id == id).first()

        if not profil:
            # fermeture de la session 
            return jsonify({"message": "ressource introuvable"}), 404

        db.delete(profil)
        db.commit()
        
        return jsonify({"message": "ressource supprimée avec succes" }), 200





    