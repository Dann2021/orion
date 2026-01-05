from flask import Blueprint, jsonify, request
from modeles.models import Contact
from database import get_db


# creation du blueprint_contact
contact_bp = Blueprint("contacts", __name__, url_prefix="/api/contacts")


# creation  d'un CRUD


# Creation de l'élément

@contact_bp.post("/")
def creer_ressource_contact():

    # Ajout du contexte de la session de la base de donnée 
    with get_db() as db:

        # creation du data_get pour recuperer les donnees du POST
        data = request.get_json()

        # creation d'une instance de la classe Contact
        contact = Contact(
            email=data.get("email"),
            telephone=data.get("telephone"),
            message=data.get("message"),
)

        # Ajout dans la session 
        db.add(contact)
        db.commit()

        return jsonify(contact.data_contact()), 201


# route pour voir une ressource
@contact_bp.get("/<int:id>")
def recuperer_ressource_contact(id):

    # Ajout du contexte de la session de la base de donnée 
    with get_db() as db:

        # verification de l'existence de la ressource
        contact = db.query(Contact).filter(Contact.id == id).first()

        if not contact:
            # fermeture de la session 
            return jsonify({"message": "ressource introuvable"}), 404
        
        return jsonify({"contact": contact.data_contact() }), 200




# route pour voir toutes les ressources
@contact_bp.get("/")
def recuperer_ressources_contact():

    # Ajout du contexte de la session de la base de donnée 
    with get_db() as db:

        # verification de l'existence de la ressource
        contact_list = db.query(Contact).all()

        if not contact_list:
            # fermeture de la session 
            return jsonify({"message": "ressources introuvable"}), 404

        return jsonify({"contacts": Contact.list_data(contact_list)}), 200




# route pour supprimer une ressource 
@contact_bp.delete("/<int:id>")
def supprimer_ressource_contact(id):

    # Ajout du contexte de la session de la base de donnée 
    with get_db() as db:

        # verification de l'existence de la ressource
        contact = db.query(Contact).filter(Contact.id == id).first()

        if not contact:
            # fermeture de la session 
            return jsonify({"message": "ressource introuvable"}), 404

        db.delete(contact)
        db.commit()
        
        return jsonify({"message": "ressource supprimée avec succes" }), 200





    