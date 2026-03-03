# Projet final pour utiliser dans mon app
# Création des modèles pour la base de données
from database import Base
from sqlalchemy import JSON, Column, ForeignKey, Integer, String
from sqlalchemy.orm import relationship


class Projet(Base):
    # nom de la table dans la base de donnees
    __tablename__ = "projets"

    # attributs (colonnes) de la classe Projet (projet)
    id = Column(Integer, primary_key=True, index=True)
    nom = Column(String, index=True)
    auteur = Column(String)
    langage = Column(String, nullable=True)

    # relations
    modeles = relationship(
        "Modele", back_populates="projet", cascade="all, delete-orphan"
    )


class Modele(Base):
    # nom de la table dans la base de donnees
    __tablename__ = "modeles"

    # attributs (colonnes) de la classe Modele (modele)
    id = Column(Integer, primary_key=True, index=True)
    config = Column(JSON)

    # relations
    projet_id = Column(Integer, ForeignKey("projets.id"), nullable=True)
    projet = relationship("Projet", back_populates="modeles")

    datas = relationship("Data", back_populates="modele", cascade="all, delete-orphan")


class Data(Base):
    # nom de la table dans la base de donnees
    __tablename__ = "databases"

    # attributs (colonnes) de la classe Database (database)
    id = Column(Integer, primary_key=True, index=True)
    type = Column(String, nullable=False)
    host = Column(String, nullable=True)
    port = Column(String, nullable=True)
    username = Column(String, nullable=True)
    password = Column(String, nullable=True)
    name = Column(String, nullable=True)

    # relations

    modele_id = Column(Integer, ForeignKey("modeles.id"), nullable=True)
    modele = relationship("Modele", back_populates="datas")
