# Projet final pour utiliser dans mon app
# creation des modeles pour la base de données
from sqlalchemy import Column, ForeignKey, Boolean, Date, Integer, String, Text
from sqlalchemy.orm import relationship 
from database import Base 

class User(Base):

    # nom de la table dans la base de donnée
    __tablename__ = "users"
    
    # creation des attributs
    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, nullable=False, unique=True)
    password = Column(String,nullable=False)
 


class User(Base):
    # nom de la table dans la base de donnees
    __tablename__ = "users"

    # attributs (colonnes) de la classe User (user)
    id = Column(Integer, primary_key=True, index=True)


    # relations
 
   

class Utilisateur(Base):
    # nom de la table dans la base de donnees
    __tablename__ = "utilisateurs"

    # attributs (colonnes) de la classe Utilisateur (utilisateur)
    id = Column(Integer, primary_key=True, index=True)
    nom = Column(String)
    email = Column(String, unique=True)
    role = Column(String, default="admin")


    # relations
    publications = relationship("Publication", back_populates="utilisateur", cascade="all, delete-orphan") 
 
   

class Publication(Base):
    # nom de la table dans la base de donnees
    __tablename__ = "publications"

    # attributs (colonnes) de la classe Publication (publication)
    id = Column(Integer, primary_key=True, index=True)
    titre = Column(String)
    contenu = Column(Text)
    date_creation = Column(Date)
    is_public = Column(Boolean)


    # relations
    utilisateur_id = Column(Integer, ForeignKey("utilisateurs.id"), nullable=True)
    utilisateur = relationship("Utilisateur", back_populates="publications")
 
   


