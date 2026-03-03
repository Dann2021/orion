from sqlalchemy import Column, ForeignKey, Integer, String, Text
from sqlalchemy.orm import relationship  # , sessionmaker

from database import Base

# creation d'une session pour encapsuler toutes nos requetes dans la base de données
# Session = sessionmaker()
# session = Session()

# Base = declarative_base()


# en sqlalchemy chaque classe représente une table dans la base de données
# chaque attribut de classe représente des colonnes de la table dans la base de données

# Ex : class User -> table (users)


class User(Base):

    # nom de la table dans la base de données
    __tablename__ = "users"

    # creations des attributs (ou colonnes) de la table
    id = Column(Integer, primary_key=True)
    nom = Column(String)
    age = Column(Integer)

    # relation avec la table articles
    articles = relationship("Article", back_populates="user")


# Sqlalchemy permet de gérer des relations entre des tables


class Article(Base):
    __tablename__ = "articles"

    id = Column(Integer, primary_key=True)
    titre = Column(String(30))
    contenu = Column(Text)

    # relation avec la table users
    user_id = Column(Integer, ForeignKey("users.id"))
    user = relationship("User", back_populates="articles")
