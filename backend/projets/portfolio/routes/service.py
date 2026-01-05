from flask import Blueprint, jsonify, request
from modeles.models import Service
from database import get_db


# creation du blueprint_service
service_bp = Blueprint("services", __name__, url_prefix="/api/services")


# creation  d'un CRUD


# Creation de l'élément

@service_bp.post("/")
def creer_ressource_service():

    # Ajout du contexte de la session de la base de donnée 
    with get_db() as db:

        # creation du data_get pour recuperer les donnees du POST
        data = request.get_json()

        # creation d'une instance de la classe Service
        service = Service(
            nom=data.get("nom"),
            description=data.get("description"),
)

        # Ajout dans la session 
        db.add(service)
        db.commit()

        return jsonify(service.data_service()), 201


# route pour voir une ressource
@service_bp.get("/<int:id>")
def recuperer_ressource_service(id):

    # Ajout du contexte de la session de la base de donnée 
    with get_db() as db:

        # verification de l'existence de la ressource
        service = db.query(Service).filter(Service.id == id).first()

        if not service:
            # fermeture de la session 
            return jsonify({"message": "ressource introuvable"}), 404
        
        return jsonify({"service": service.data_service() }), 200




# route pour voir toutes les ressources
@service_bp.get("/")
def recuperer_ressources_service():

    # Ajout du contexte de la session de la base de donnée 
    with get_db() as db:

        # verification de l'existence de la ressource
        service_list = db.query(Service).all()

        if not service_list:
            # fermeture de la session 
            return jsonify({"message": "ressources introuvable"}), 404

        return jsonify({"services": Service.list_data(service_list)}), 200




# route pour supprimer une ressource 
@service_bp.delete("/<int:id>")
def supprimer_ressource_service(id):

    # Ajout du contexte de la session de la base de donnée 
    with get_db() as db:

        # verification de l'existence de la ressource
        service = db.query(Service).filter(Service.id == id).first()

        if not service:
            # fermeture de la session 
            return jsonify({"message": "ressource introuvable"}), 404

        db.delete(service)
        db.commit()
        
        return jsonify({"message": "ressource supprimée avec succes" }), 200





    