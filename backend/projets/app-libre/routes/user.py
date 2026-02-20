from flask import Blueprint, jsonify, request, abort
from modeles.models import User
from utils.utils import reponse_json
from database import get_db
from schemas.user_schema import UserSchema
from marshmallow import ValidationError

from flask_jwt_extended import (
    create_access_token,
    get_jwt_identity,
    jwt_required,
    set_access_cookies,
    unset_jwt_cookies,
    create_refresh_token
)



# creation du blueprint_user
user_bp = Blueprint("users", __name__, url_prefix="/api/users")

# creation  d'un CRUD (Create, Read, Update, Delete)
# La création de cette api suit le pattern RESTful

# creation des modeles schema pour la serialisation/deserialisation
user_schema = UserSchema()
user_schemas = UserSchema(many=True)

# Creation de la ressource user 
@user_bp.post("/")
def creer_ressource_user():

    with get_db() as db:
        try: 
            # creation du data_get pour recuperer les donnees du POST
            data = request.get_json()
            if data is None:
                abort(400, description="JSON invalide")



            # creation d'une instance de la classe User
            user = user_schema.load(data, session=db)

            db.add(user)
            db.commit()

            return reponse_json(data=user_schema.dump(user), status=201)
        except ValidationError as err:
            abort(400, description=str(err.messages))



# route pour voir une ressource
@user_bp.get("/<int:id>")
def recuperer_ressource_user(id):

    with get_db() as db:
        # verification de l'existence de la ressource
        user = db.query(User).filter(User.id == id).first()

        if not user:
            abort(404) 
        return reponse_json(data=user_schema.dump(user))



# route pour voir toutes les ressources (avec pagination et filtres)
@user_bp.get("/")
def recuperer_ressources_users():

    with get_db() as db:
        # creation de la pagination + filtres
        limit = request.args.get("limit", 20, type=int)
        offset = request.args.get("offset", 0, type=int)

        query = db.query(User)

        total = query.count()
        items = query.offset(offset).limit(limit).all()

        return reponse_json(
            data=user_schemas.dump(items),
            meta={
                "total": total,
                "limit": limit,
                "offset": offset
            }
        )

# route pour mettre a jour une ressource
@user_bp.put("/<int:id>")
def mettre_a_jour_ressource_user(id):

    with get_db() as db:
        # verification de l'existence de la ressource
        user = db.query(User).filter(User.id == id).first()

        if not user:
            abort(404)

        # recuperation des donnees du PUT
        try:
            data = request.get_json()
            if data is None:
                abort(400, description="JSON invalide")
            updated = user_schema.load(data,instance=user,session=db,partial=True)
            db.commit()
            return reponse_json(data=user_schema.dump(updated))
        except ValidationError as err:
            abort(400, description=str(err.messages))


# route pour supprimer une ressource 
@user_bp.delete("/<int:id>")
def supprimer_ressource_user(id):

    with get_db() as db:
        # verification de l'existence de la ressource
        user = db.query(User).filter(User.id == id).first()

        if not user:
            abort(404)
        db.delete(user)
        db.commit()       
        return reponse_json(data={"message": "ressource supprimée avec succes"})



