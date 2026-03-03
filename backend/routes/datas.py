from database import get_db
from flask import Blueprint, abort, request
from marshmallow import ValidationError
from modeles.models import Data, Modele
from schema.datas_schema import DataSchema
from utils.utils import get_json_or_400, reponse_json

# creation du blueprint_database
database_bp = Blueprint("datas", __name__, url_prefix="/api/databases")

# creation  d'un CRUD (Create, Read, Update, Delete)
# La création de cette api suit le pattern RESTful

# creation des modeles schema pour la serialisation/deserialisation
database_schema = DataSchema()
database_schemas = DataSchema(many=True)


# Creation de la ressource database
@database_bp.post("/<int:id>")
def creer_ressource_database(id):

    with get_db() as db:
        try:
            # creation du data_get pour recuperer les donnees du POST
            data = get_json_or_400()

            # modele_id = db.get(Modele, data.get("modele_id"))
            modele_id = db.query(Modele).filter(Modele.id == id).first()
            if not modele_id:
                abort(400, description="modele_id introuvable")

            data["modele_id"] = modele_id
            # creation d'une instance de la classe Database
            database = database_schema.load(data, session=db)

            db.add(database)
            db.commit()

            return reponse_json(data=database_schema.dump(database), status=201)
        except ValidationError as err:
            abort(400, description=str(err.messages))


# route pour voir une ressource
@database_bp.get("/<int:id>")
def recuperer_ressource_database(id):

    with get_db() as db:
        # verification de l'existence de la ressource
        database = db.query(Data).filter(Data.id == id).first()
        if not database:
            abort(404)

        return reponse_json(data=database_schema.dump(database))


# route pour voir toutes les ressources (avec pagination et filtres)
@database_bp.get("/")
def recuperer_ressources_databases():

    with get_db() as db:
        # creation de la pagination + filtres
        limit = min(request.args.get("limit", 20, type=int), 100)
        offset = request.args.get("offset", 0, type=int)

        query = db.query(Data)
        if "type" in request.args:
            query = query.filter(Data.type == request.args.get("type"))
        if "host" in request.args:
            query = query.filter(Data.host == request.args.get("host"))
        if "port" in request.args:
            query = query.filter(Data.port == request.args.get("port"))
        if "username" in request.args:
            query = query.filter(Data.username == request.args.get("username"))
        if "password" in request.args:
            query = query.filter(Data.password == request.args.get("password"))
        if "name" in request.args:
            query = query.filter(Data.name == request.args.get("name"))

        total = query.count()
        items = query.offset(offset).limit(limit).all()

        return reponse_json(
            data=database_schemas.dump(items),
            meta={"total": total, "limit": limit, "offset": offset},
        )


# route pour mettre a jour une ressource
@database_bp.put("/<int:id>")
def mettre_a_jour_ressource_database(id):

    with get_db() as db:
        # verification de l'existence de la ressource
        database = db.query(Data).filter(Data.id == id).first()
        if not database:
            abort(404)

        # recuperation des donnees du PUT
        try:

            data = get_json_or_400()
            updated = database_schema.load(
                data, instance=database, session=db, partial=True
            )
            db.commit()

            return reponse_json(data=database_schema.dump(updated))
        except ValidationError as err:
            abort(400, description=str(err.messages))


# route pour supprimer une ressource
@database_bp.delete("/<int:id>")
def supprimer_ressource_database(id):

    with get_db() as db:
        # verification de l'existence de la ressource
        database = db.query(Data).filter(Data.id == id).first()
        if not database:
            abort(404)

        db.delete(database)
        db.commit()

        return reponse_json(data={"message": "ressource supprimée avec succes"})
