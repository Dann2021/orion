from database import get_db
from flask import Blueprint, abort, request
from marshmallow import ValidationError
from modeles.models import Modele, Projet
from schema.datas_schema import DataSchema
from schema.modele_schema import ModeleSchema
from utils.utils import get_json_or_400, reponse_json

# creation du blueprint_modele
modele_bp = Blueprint("modeles", __name__, url_prefix="/api/modeles")

# creation  d'un CRUD (Create, Read, Update, Delete)
# La création de cette api suit le pattern RESTful

# creation des modeles schema pour la serialisation/deserialisation
modele_schema = ModeleSchema()
modele_schemas = ModeleSchema(many=True)


# Creation de la ressource modele
@modele_bp.post("/<int:id>")
def creer_ressource_modele(id):

    with get_db() as db:
        try:
            # creation du data_get pour recuperer les donnees du POST
            data = get_json_or_400()

            # projet_id = db.get(Projet, data.get("projet_id"))
            projet_id = db.query(Projet).filter(Projet.id == id).first()
            if not projet_id:
                abort(400, description="projet_id introuvable")

            data["projet_id"] = projet_id.id
            # creation d'une instance de la classe Modele
            modele = modele_schema.load(data, session=db)

            db.add(modele)
            db.commit()

            return reponse_json(data=modele_schema.dump(modele), status=201)
        except ValidationError as err:
            abort(400, description=str(err.messages))


# route pour voir une ressource
@modele_bp.get("/<int:id>")
def recuperer_ressource_modele(id):

    with get_db() as db:
        # verification de l'existence de la ressource
        modele = db.query(Modele).filter(Modele.id == id).first()
        if not modele:
            abort(404)

        return reponse_json(data=modele_schema.dump(modele))


# route pour voir toutes les ressources (avec pagination et filtres)
@modele_bp.get("/")
def recuperer_ressources_modeles():

    with get_db() as db:
        # creation de la pagination + filtres
        limit = min(request.args.get("limit", 20, type=int), 100)
        offset = request.args.get("offset", 0, type=int)

        query = db.query(Modele)
        if "config" in request.args:
            query = query.filter(Modele.config == request.args.get("config"))

        total = query.count()
        items = query.offset(offset).limit(limit).all()

        return reponse_json(
            data=modele_schemas.dump(items),
            meta={"total": total, "limit": limit, "offset": offset},
        )


# route pour mettre a jour une ressource
@modele_bp.put("/<int:id>")
def mettre_a_jour_ressource_modele(id):

    with get_db() as db:
        # verification de l'existence de la ressource
        modele = db.query(Modele).filter(Modele.id == id).first()
        if not modele:
            abort(404)

        # recuperation des donnees du PUT
        try:

            data = get_json_or_400()
            updated = modele_schema.load(
                data, instance=modele, session=db, partial=True
            )
            db.commit()

            return reponse_json(data=modele_schema.dump(updated))
        except ValidationError as err:
            abort(400, description=str(err.messages))


# route pour supprimer une ressource
@modele_bp.delete("/<int:id>")
def supprimer_ressource_modele(id):

    with get_db() as db:
        # verification de l'existence de la ressource
        modele = db.query(Modele).filter(Modele.id == id).first()
        if not modele:
            abort(404)

        db.delete(modele)
        db.commit()

        return reponse_json(data={"message": "ressource supprimée avec succes"})


# routes pour les relations
database_schema = DataSchema()
database_schemas = DataSchema(many=True)


@modele_bp.get("/<int:id>/databases")
def recuperer_ressource_lie_modele_databases(id):

    with get_db() as db:
        ressource = db.query(Modele).filter(Modele.id == id).first()

        if not ressource:
            abort(404)

        items = ressource.databases
        return reponse_json(data=database_schemas.dump(items))
