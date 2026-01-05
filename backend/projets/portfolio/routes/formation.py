from flask import Blueprint, jsonify, request
from modeles.models import Formation
from database import get_db


# creation du blueprint_formation
formation_bp = Blueprint("formations", __name__, url_prefix="/api/formations")


# creation  d'un CRUD


# Creation de l'élément

@formation_bp.post("/")
def creer_ressource_formation():

    # Ajout du contexte de la session de la base de donnée 
    with get_db() as db:

        # creation du data_get pour recuperer les donnees du POST
        data = request.get_json()

        # creation d'une instance de la classe Formation
        formation = Formation(
            diplome=data.get("diplome"),
            etablissement=data.get("etablissement"),
            annee=data.get("annee"),
)

        # Ajout dans la session 
        db.add(formation)
        db.commit()

        return jsonify(formation.data_formation()), 201


# route pour voir une ressource
@formation_bp.get("/<int:id>")
def recuperer_ressource_formation(id):

    # Ajout du contexte de la session de la base de donnée 
    with get_db() as db:

        # verification de l'existence de la ressource
        formation = db.query(Formation).filter(Formation.id == id).first()

        if not formation:
            # fermeture de la session 
            return jsonify({"message": "ressource introuvable"}), 404
        
        return jsonify({"formation": formation.data_formation() }), 200




# route pour voir toutes les ressources
@formation_bp.get("/")
def recuperer_ressources_formation():

    # Ajout du contexte de la session de la base de donnée 
    with get_db() as db:

        # verification de l'existence de la ressource
        formation_list = db.query(Formation).all()

        if not formation_list:
            # fermeture de la session 
            return jsonify({"message": "ressources introuvable"}), 404

        return jsonify({"formations": Formation.list_data(formation_list)}), 200




# route pour supprimer une ressource 
@formation_bp.delete("/<int:id>")
def supprimer_ressource_formation(id):

    # Ajout du contexte de la session de la base de donnée 
    with get_db() as db:

        # verification de l'existence de la ressource
        formation = db.query(Formation).filter(Formation.id == id).first()

        if not formation:
            # fermeture de la session 
            return jsonify({"message": "ressource introuvable"}), 404

        db.delete(formation)
        db.commit()
        
        return jsonify({"message": "ressource supprimée avec succes" }), 200





    