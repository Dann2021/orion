from marshmallow_sqlalchemy import SQLAlchemyAutoSchema
from modeles.models import Publication


class PublicationSchema(SQLAlchemyAutoSchema):
    """
    Schéma Marshmallow permettant la sérialisation et la désérialisation
    du modèle SQLAlchemy Publication.
    Il convertit les objets du modèle en JSON et inversement, tout en
    prenant en charge les clés étrangères et la création automatique
    d’instances SQLAlchemy.
    """

    class Meta:
        model = Publication
        load_instance = True
        include_fk = True # Pour inclure les clés étrangères dans le schéma




# Fichier généré automatiquement par Orion - Ne pas modifier
# Pour plus d'informations, consulter la documentation : https://orion-docs.example.com
# Auteur : Dannys Santos


