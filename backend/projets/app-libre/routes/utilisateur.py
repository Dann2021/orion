from flask import Blueprint, jsonify, request, abort
from modeles.models import Utilisateur
from utils.utils import reponse_json
from database import get_db
from schemas.utilisateur_schema import UtilisateurSchema
from marshmallow import ValidationError

from flask_jwt_extended import (
    create_access_token,
    get_jwt_identity,
    jwt_required,
    set_access_cookies,
    unset_jwt_cookies,
    create_refresh_token
)



# creation du blueprint_utilisateur
utilisateur_bp = Blueprint("utilisateurs", __name__, url_prefix="/api/utilisateurs")

# creation  d'un CRUD (Create, Read, Update, Delete)
# La création de cette api suit le pattern RESTful

# creation des modeles schema pour la serialisation/deserialisation
utilisateur_schema = UtilisateurSchema()
utilisateur_schemas = UtilisateurSchema(many=True)

# Creation de la ressource utilisateur 
@utilisateur_bp.post("/")
def creer_ressource_utilisateur():

    with get_db() as db:
        try: 
            # creation du data_get pour recuperer les donnees du POST
            data = request.get_json()
            if data is None:
                abort(400, description="JSON invalide")



            # creation d'une instance de la classe Utilisateur
            utilisateur = utilisateur_schema.load(data, session=db)

            db.add(utilisateur)
            db.commit()

            return reponse_json(data=utilisateur_schema.dump(utilisateur), status=201)
        except ValidationError as err:
            abort(400, description=str(err.messages))



# route pour voir une ressource
@utilisateur_bp.get("/<int:id>")
def recuperer_ressource_utilisateur(id):

    with get_db() as db:
        # verification de l'existence de la ressource
        utilisateur = db.query(Utilisateur).filter(Utilisateur.id == id).first()

        if not utilisateur:
            abort(404) 
        return reponse_json(data=utilisateur_schema.dump(utilisateur))



# route pour voir toutes les ressources (avec pagination et filtres)
@utilisateur_bp.get("/")
def recuperer_ressources_utilisateurs():

    with get_db() as db:
        # creation de la pagination + filtres
        limit = request.args.get("limit", 20, type=int)
        offset = request.args.get("offset", 0, type=int)

        query = db.query(Utilisateur)
        if "nom" in request.args:
            query = query.filter(Utilisateur.nom == request.args.get("nom"))
        if "email" in request.args:
            query = query.filter(Utilisateur.email == request.args.get("email"))
        if "role" in request.args:
            query = query.filter(Utilisateur.role == request.args.get("role"))

        total = query.count()
        items = query.offset(offset).limit(limit).all()

        return reponse_json(
            data=utilisateur_schemas.dump(items),
            meta={
                "total": total,
                "limit": limit,
                "offset": offset
            }
        )

# route pour mettre a jour une ressource
@utilisateur_bp.put("/<int:id>")
def mettre_a_jour_ressource_utilisateur(id):

    with get_db() as db:
        # verification de l'existence de la ressource
        utilisateur = db.query(Utilisateur).filter(Utilisateur.id == id).first()

        if not utilisateur:
            abort(404)

        # recuperation des donnees du PUT
        try:
            data = request.get_json()
            if data is None:
                abort(400, description="JSON invalide")
            updated = utilisateur_schema.load(data,instance=utilisateur,session=db,partial=True)
            db.commit()
            return reponse_json(data=utilisateur_schema.dump(updated))
        except ValidationError as err:
            abort(400, description=str(err.messages))


# route pour supprimer une ressource 
@utilisateur_bp.delete("/<int:id>")
def supprimer_ressource_utilisateur(id):

    with get_db() as db:
        # verification de l'existence de la ressource
        utilisateur = db.query(Utilisateur).filter(Utilisateur.id == id).first()

        if not utilisateur:
            abort(404)
        db.delete(utilisateur)
        db.commit()       
        return reponse_json(data={"message": "ressource supprimée avec succes"})



# routes pour les relations
from schemas.publication_schema import PublicationSchema
publication_schemas = PublicationSchema(many=True)

@utilisateur_bp.get("/<int:id>/publications")
def recuperer_ressource_lie_utilisateur_publications(id):

    with get_db() as db:
        ressource = db.query(Utilisateur).filter(Utilisateur.id == id).first()

        if not ressource:
            abort(404)

        items = ressource.publications
        return reponse_json(data=publication_schemas.dump(items))


