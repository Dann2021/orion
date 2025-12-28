# Projet final pour utiliser dans mon app
# Création des modèles pour la base de données

from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship
from database import Base


# ===================== PROJET =====================


class Projet(Base):
    __tablename__ = "projets"

    id = Column(Integer, primary_key=True, index=True)
    nom = Column(String, index=True, nullable=False)
    auteur = Column(String, index=True, nullable=False)

    # 🔗 LIAISON : 1 Projet -> N Classes
    classes = relationship(
        "Classe", back_populates="projet", cascade="all, delete-orphan"
    )

    def data_projet(self):
        return {
            "id": self.id,
            "nom": self.nom,
            "auteur": self.auteur,
        }

    @staticmethod
    def list_data(items):
        return [item.data_projet() for item in items]


# ===================== CLASSE =====================


class Classe(Base):
    __tablename__ = "classes"

    id = Column(Integer, primary_key=True, index=True)
    nom = Column(String, index=True, nullable=False)

    # 🔗 FK vers Projet
    projet_id = Column(Integer, ForeignKey("projets.id"), nullable=False)

    # 🔗 LIAISON : N Classes -> 1 Projet
    projet = relationship("Projet", back_populates="classes")

    # 🔗 LIAISON : 1 Classe -> N Attributs
    attributs = relationship(
        "Attribut", back_populates="classe", cascade="all, delete-orphan"
    )

    def data_classe(self):
        return {
            "id": self.id,
            "nom": self.nom,
            "projet_id": self.projet_id,
        }

    @staticmethod
    def list_data(items):
        return [item.data_classe() for item in items]


# ===================== ATTRIBUT =====================


class Attribut(Base):
    __tablename__ = "attributs"

    id = Column(Integer, primary_key=True, index=True)
    nom = Column(String, index=True, nullable=False)
    type = Column(String, index=True, nullable=False)

    # 🔗 FK vers Classe
    classe_id = Column(Integer, ForeignKey("classes.id"), nullable=False)

    # 🔗 LIAISON : N Attributs -> 1 Classe
    classe = relationship("Classe", back_populates="attributs")

    def data_attribut(self):
        return {
            "id": self.id,
            "nom": self.nom,
            "type": self.type,
            "classe_id": self.classe_id,
        }

    @staticmethod
    def list_data(items):
        return [item.data_attribut() for item in items]
