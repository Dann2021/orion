from flask import Blueprint, request, abort
from modeles.models import User
from utils.utils import reponse_json, get_json_or_400
from database import get_db
from schemas.user_schema import UserSchema
from marshmallow import ValidationError
from extensions import bcrypt
from flask_jwt_extended import (
    create_access_token,
    get_jwt_identity,
    jwt_required,
    set_access_cookies,
    unset_jwt_cookies,
    set_refresh_cookies,
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
            data = get_json_or_400()

            password_hashed = bcrypt.generate_password_hash(data['password']).decode('utf-8')
            data['password'] = password_hashed


            



            # creation d'une instance de la classe User
            user = user_schema.load(data, session=db)

            db.add(user)
            db.commit()

            return reponse_json(data=user_schema.dump(user), status=201)
        except ValidationError as err:
            abort(400, description=str(err.messages))

# Configuration jwt

# route login
@user_bp.post("/login")
def login_user():

    # creation du data_get pour recuperer les donnees du POST
    data = get_json_or_400()

    email = data.get("email")
    password = data.get("password")

    if not email or not password:
        abort(400, description="Email et mot de passe requis")

    with get_db() as db:
        user = db.query(User).filter_by(email=email).first()
        
        if not user:
            abort(401, description="Identifiants invalides")

        ok = bcrypt.check_password_hash(user.password, password)
        if not ok :
            abort(401, description="Mot de passe invalide")
        
        # Identity = ce que tu as défini dans auth.claims.identity
        access_token = create_access_token(identity=str(user.id), additional_claims={"role": user.role})

        refresh_token = create_refresh_token(identity=str(user.id))

        # creation de la reponse
        rep = reponse_json(data={"message": "authentification reussie"})

        # on utilise la fonction set_access_cookies pour stocker le token dans les cookies de la reponse
        set_access_cookies(rep, access_token)
        set_refresh_cookies(rep, refresh_token)

        return rep

# route logout
@user_bp.post("/logout")
@jwt_required()
def logout():
    rep = reponse_json(data={"message": "Logout reussi"})
    unset_jwt_cookies(rep)
    return rep

# Route pour voir le profil
@user_bp.get("/me")
@jwt_required()
def me():
    # recuperation du user_id via get_jwt_identity
    user_id = get_jwt_identity()
    with get_db() as db:

        user = db.query(User).filter(User.id == user_id).first()
        if not user:
            abort(404, description="Utilisateur introuvable")

        return  reponse_json(data=user_schema.dump(user))


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
        limit = min(request.args.get("limit", 20, type=int), 100)
        offset = request.args.get("offset", 0, type=int)

        query = db.query(User)
        if "email" in request.args:
            query = query.filter(User.email == request.args.get("email"))
        if "password" in request.args:
            query = query.filter(User.password == request.args.get("password"))
        if "role" in request.args:
            query = query.filter(User.role == request.args.get("role"))

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

            data = get_json_or_400()
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




