from flask import Blueprint, jsonify, request, abort
from modeles.models import Publication
from utils.utils import reponse_json
from database import get_db
from schemas.publication_schema import PublicationSchema
from marshmallow import ValidationError




# creation du blueprint_publication
publication_bp = Blueprint("publications", __name__, url_prefix="/api/publications")

# creation  d'un CRUD (Create, Read, Update, Delete)
# La création de cette api suit le pattern RESTful

# creation des modeles schema pour la serialisation/deserialisation
publication_schema = PublicationSchema()
publication_schemas = PublicationSchema(many=True)

# Creation de la ressource publication 
@publication_bp.post("/")
def creer_ressource_publication():

    with get_db() as db:
        try: 
            # creation du data_get pour recuperer les donnees du POST
            data = request.get_json()
            if data is None:
                abort(400, description="JSON invalide")



            # creation d'une instance de la classe Publication
            publication = publication_schema.load(data, session=db)

            db.add(publication)
            db.commit()

            return reponse_json(data=publication_schema.dump(publication), status=201)
        except ValidationError as err:
            abort(400, description=str(err.messages))



# route pour voir une ressource
@publication_bp.get("/<int:id>")
def recuperer_ressource_publication(id):

    with get_db() as db:
        # verification de l'existence de la ressource
        publication = db.query(Publication).filter(Publication.id == id).first()

        if not publication:
            abort(404) 
        return reponse_json(data=publication_schema.dump(publication))



# route pour voir toutes les ressources (avec pagination et filtres)
@publication_bp.get("/")
def recuperer_ressources_publications():

    with get_db() as db:
        # creation de la pagination + filtres
        limit = request.args.get("limit", 20, type=int)
        offset = request.args.get("offset", 0, type=int)

        query = db.query(Publication)
        if "titre" in request.args:
            query = query.filter(Publication.titre == request.args.get("titre"))
        if "contenu" in request.args:
            query = query.filter(Publication.contenu == request.args.get("contenu"))
        if "date_creation" in request.args:
            query = query.filter(Publication.date_creation == request.args.get("date_creation"))
        if "is_public" in request.args:
            query = query.filter(Publication.is_public == request.args.get("is_public"))

        total = query.count()
        items = query.offset(offset).limit(limit).all()

        return reponse_json(
            data=publication_schemas.dump(items),
            meta={
                "total": total,
                "limit": limit,
                "offset": offset
            }
        )

# route pour mettre a jour une ressource
@publication_bp.put("/<int:id>")
def mettre_a_jour_ressource_publication(id):

    with get_db() as db:
        # verification de l'existence de la ressource
        publication = db.query(Publication).filter(Publication.id == id).first()

        if not publication:
            abort(404)

        # recuperation des donnees du PUT
        try:
            data = request.get_json()
            if data is None:
                abort(400, description="JSON invalide")
            updated = publication_schema.load(data,instance=publication,session=db,partial=True)
            db.commit()
            return reponse_json(data=publication_schema.dump(updated))
        except ValidationError as err:
            abort(400, description=str(err.messages))


# route pour supprimer une ressource 
@publication_bp.delete("/<int:id>")
def supprimer_ressource_publication(id):

    with get_db() as db:
        # verification de l'existence de la ressource
        publication = db.query(Publication).filter(Publication.id == id).first()

        if not publication:
            abort(404)
        db.delete(publication)
        db.commit()       
        return reponse_json(data={"message": "ressource supprimée avec succes"})



