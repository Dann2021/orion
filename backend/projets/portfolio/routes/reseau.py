from flask import Blueprint, jsonify, request
from modeles.models import Reseau
from database import get_db


# creation du blueprint_reseau
reseau_bp = Blueprint("reseaus", __name__, url_prefix="/api/reseaus")


# creation  d'un CRUD


# Creation de l'élément

@reseau_bp.post("/")
def creer_ressource_reseau():

    # Ajout du contexte de la session de la base de donnée 
    with get_db() as db:

        # creation du data_get pour recuperer les donnees du POST
        data = request.get_json()

        # creation d'une instance de la classe Reseau
        reseau = Reseau(
            nom=data.get("nom"),
            url=data.get("url"),
)

        # Ajout dans la session 
        db.add(reseau)
        db.commit()

        return jsonify(reseau.data_reseau()), 201


# route pour voir une ressource
@reseau_bp.get("/<int:id>")
def recuperer_ressource_reseau(id):

    # Ajout du contexte de la session de la base de donnée 
    with get_db() as db:

        # verification de l'existence de la ressource
        reseau = db.query(Reseau).filter(Reseau.id == id).first()

        if not reseau:
            # fermeture de la session 
            return jsonify({"message": "ressource introuvable"}), 404
        
        return jsonify({"reseau": reseau.data_reseau() }), 200




# route pour voir toutes les ressources
@reseau_bp.get("/")
def recuperer_ressources_reseau():

    # Ajout du contexte de la session de la base de donnée 
    with get_db() as db:

        # verification de l'existence de la ressource
        reseau_list = db.query(Reseau).all()

        if not reseau_list:
            # fermeture de la session 
            return jsonify({"message": "ressources introuvable"}), 404

        return jsonify({"reseaus": Reseau.list_data(reseau_list)}), 200




# route pour supprimer une ressource 
@reseau_bp.delete("/<int:id>")
def supprimer_ressource_reseau(id):

    # Ajout du contexte de la session de la base de donnée 
    with get_db() as db:

        # verification de l'existence de la ressource
        reseau = db.query(Reseau).filter(Reseau.id == id).first()

        if not reseau:
            # fermeture de la session 
            return jsonify({"message": "ressource introuvable"}), 404

        db.delete(reseau)
        db.commit()
        
        return jsonify({"message": "ressource supprimée avec succes" }), 200





    