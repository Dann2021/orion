from flask import Blueprint, jsonify, request
from modeles.models import Certification
from database import get_db


# creation du blueprint_certification
certification_bp = Blueprint("certifications", __name__, url_prefix="/api/certifications")


# creation  d'un CRUD


# Creation de l'élément

@certification_bp.post("/")
def creer_ressource_certification():

    # Ajout du contexte de la session de la base de donnée 
    with get_db() as db:

        # creation du data_get pour recuperer les donnees du POST
        data = request.get_json()

        # creation d'une instance de la classe Certification
        certification = Certification(
            nom=data.get("nom"),
            organisme=data.get("organisme"),
            annee=data.get("annee"),
)

        # Ajout dans la session 
        db.add(certification)
        db.commit()

        return jsonify(certification.data_certification()), 201


# route pour voir une ressource
@certification_bp.get("/<int:id>")
def recuperer_ressource_certification(id):

    # Ajout du contexte de la session de la base de donnée 
    with get_db() as db:

        # verification de l'existence de la ressource
        certification = db.query(Certification).filter(Certification.id == id).first()

        if not certification:
            # fermeture de la session 
            return jsonify({"message": "ressource introuvable"}), 404
        
        return jsonify({"certification": certification.data_certification() }), 200




# route pour voir toutes les ressources
@certification_bp.get("/")
def recuperer_ressources_certification():

    # Ajout du contexte de la session de la base de donnée 
    with get_db() as db:

        # verification de l'existence de la ressource
        certification_list = db.query(Certification).all()

        if not certification_list:
            # fermeture de la session 
            return jsonify({"message": "ressources introuvable"}), 404

        return jsonify({"certifications": Certification.list_data(certification_list)}), 200




# route pour supprimer une ressource 
@certification_bp.delete("/<int:id>")
def supprimer_ressource_certification(id):

    # Ajout du contexte de la session de la base de donnée 
    with get_db() as db:

        # verification de l'existence de la ressource
        certification = db.query(Certification).filter(Certification.id == id).first()

        if not certification:
            # fermeture de la session 
            return jsonify({"message": "ressource introuvable"}), 404

        db.delete(certification)
        db.commit()
        
        return jsonify({"message": "ressource supprimée avec succes" }), 200





    