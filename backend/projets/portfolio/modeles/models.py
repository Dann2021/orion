# Projet final pour utiliser dans mon app
# creation des modeles pour la base de données
from sqlalchemy import Column, ForeignKey, Boolean, Date, Integer, String, Text
from sqlalchemy.orm import relationship
from database import Base


class Portfolio(Base):
    # nom de la table dans la base de donnees
    __tablename__ = "portfolios"

    # attributs (colonnes) de la nomClasse Portfolio (portfolio)
    id = Column(Integer, primary_key=True, index=True)

    titre = Column(String, unique=False)
    description = Column(Text, unique=False)
    photo = Column(String, unique=False)
    localisation = Column(String, unique=False)
    disponible = Column(Boolean, unique=False)

    # relations
    profils = relationship(
        "Profil", back_populates="portfolio", cascade="all, delete-orphan"
    )

    competences = relationship(
        "Competence", back_populates="portfolio", cascade="all, delete-orphan"
    )

    experiences = relationship(
        "Experience", back_populates="portfolio", cascade="all, delete-orphan"
    )

    projets = relationship(
        "Projet", back_populates="portfolio", cascade="all, delete-orphan"
    )

    formations = relationship(
        "Formation", back_populates="portfolio", cascade="all, delete-orphan"
    )

    certifications = relationship(
        "Certification", back_populates="portfolio", cascade="all, delete-orphan"
    )

    services = relationship(
        "Service", back_populates="portfolio", cascade="all, delete-orphan"
    )

    reseaux = relationship(
        "Reseau", back_populates="portfolio", cascade="all, delete-orphan"
    )

    contacts = relationship(
        "Contact", back_populates="portfolio", cascade="all, delete-orphan"
    )

    # donnees à voir
    def data_portfolio(self):
        return {
            "id": self.id,
            "titre": self.titre,
            "description": self.description,
            "photo": self.photo,
            "localisation": self.localisation,
            "disponible": self.disponible,
        }

    # pour plusieurs portfolios
    @staticmethod
    def list_data(items):
        return [item.data_portfolio() for item in items]


class Profil(Base):
    # nom de la table dans la base de donnees
    __tablename__ = "profils"

    # attributs (colonnes) de la nomClasse Profil (profil)
    id = Column(Integer, primary_key=True, index=True)

    bio = Column(Text, unique=False)
    annees_experience = Column(Integer, unique=False)
    cv_pdf = Column(String, unique=False)

    # relations
    portfolio_id = Column(Integer, ForeignKey("portfolios.id"), nullable=True)
    portfolio = relationship("Portfolio", back_populates="profils")

    # donnees à voir
    def data_profil(self):
        return {
            "id": self.id,
            "bio": self.bio,
            "annees_experience": self.annees_experience,
            "cv_pdf": self.cv_pdf,
        }

    # pour plusieurs profils
    @staticmethod
    def list_data(items):
        return [item.data_profil() for item in items]


class Competence(Base):
    # nom de la table dans la base de donnees
    __tablename__ = "competences"

    # attributs (colonnes) de la nomClasse Competence (competence)
    id = Column(Integer, primary_key=True, index=True)

    nom = Column(String, unique=False)
    niveau = Column(Integer, unique=False)
    categorie = Column(String, unique=False)

    # relations

    portfolio_id = Column(Integer, ForeignKey("portfolios.id"), nullable=True)
    portfolio = relationship("Portfolio", back_populates="competences")

    # donnees à voir
    def data_competence(self):
        return {
            "id": self.id,
            "nom": self.nom,
            "niveau": self.niveau,
            "categorie": self.categorie,
        }

    # pour plusieurs competences
    @staticmethod
    def list_data(items):
        return [item.data_competence() for item in items]


class Experience(Base):
    # nom de la table dans la base de donnees
    __tablename__ = "experiences"

    # attributs (colonnes) de la nomClasse Experience (experience)
    id = Column(Integer, primary_key=True, index=True)

    poste = Column(String, unique=False)
    entreprise = Column(String, unique=False)
    date_debut = Column(Date, unique=False)
    date_fin = Column(Date, unique=False)
    description = Column(Text, unique=False)

    # relations

    portfolio_id = Column(Integer, ForeignKey("portfolios.id"), nullable=True)
    portfolio = relationship("Portfolio", back_populates="experiences")

    # donnees à voir
    def data_experience(self):
        return {
            "id": self.id,
            "poste": self.poste,
            "entreprise": self.entreprise,
            "date_debut": self.date_debut,
            "date_fin": self.date_fin,
            "description": self.description,
        }

    # pour plusieurs experiences
    @staticmethod
    def list_data(items):
        return [item.data_experience() for item in items]


class Projet(Base):
    # nom de la table dans la base de donnees
    __tablename__ = "projets"

    # attributs (colonnes) de la nomClasse Projet (projet)
    id = Column(Integer, primary_key=True, index=True)

    nom = Column(String, unique=False)
    description = Column(Text, unique=False)
    image = Column(String, unique=False)
    lien_demo = Column(String, unique=False)
    lien_code = Column(String, unique=False)
    featured = Column(Boolean, unique=False)

    # relations

    portfolio_id = Column(Integer, ForeignKey("portfolios.id"), nullable=True)
    portfolio = relationship("Portfolio", back_populates="projets")

    # donnees à voir
    def data_projet(self):
        return {
            "id": self.id,
            "nom": self.nom,
            "description": self.description,
            "image": self.image,
            "lien_demo": self.lien_demo,
            "lien_code": self.lien_code,
            "featured": self.featured,
        }

    # pour plusieurs projets
    @staticmethod
    def list_data(items):
        return [item.data_projet() for item in items]


class Formation(Base):
    # nom de la table dans la base de donnees
    __tablename__ = "formations"

    # attributs (colonnes) de la nomClasse Formation (formation)
    id = Column(Integer, primary_key=True, index=True)

    diplome = Column(String, unique=False)
    etablissement = Column(String, unique=False)
    annee = Column(Integer, unique=False)

    # relations

    portfolio_id = Column(Integer, ForeignKey("portfolios.id"), nullable=True)
    portfolio = relationship("Portfolio", back_populates="formations")

    # donnees à voir
    def data_formation(self):
        return {
            "id": self.id,
            "diplome": self.diplome,
            "etablissement": self.etablissement,
            "annee": self.annee,
        }

    # pour plusieurs formations
    @staticmethod
    def list_data(items):
        return [item.data_formation() for item in items]


class Certification(Base):
    # nom de la table dans la base de donnees
    __tablename__ = "certifications"

    # attributs (colonnes) de la nomClasse Certification (certification)
    id = Column(Integer, primary_key=True, index=True)

    nom = Column(String, unique=False)
    organisme = Column(String, unique=False)
    annee = Column(Integer, unique=False)

    # relations

    portfolio_id = Column(Integer, ForeignKey("portfolios.id"), nullable=True)
    portfolio = relationship("Portfolio", back_populates="certifications")

    # donnees à voir
    def data_certification(self):
        return {
            "id": self.id,
            "nom": self.nom,
            "organisme": self.organisme,
            "annee": self.annee,
        }

    # pour plusieurs certifications
    @staticmethod
    def list_data(items):
        return [item.data_certification() for item in items]


class Service(Base):
    # nom de la table dans la base de donnees
    __tablename__ = "services"

    # attributs (colonnes) de la nomClasse Service (service)
    id = Column(Integer, primary_key=True, index=True)

    nom = Column(String, unique=False)
    description = Column(Text, unique=False)

    # relations

    portfolio_id = Column(Integer, ForeignKey("portfolios.id"), nullable=True)
    portfolio = relationship("Portfolio", back_populates="services")

    # donnees à voir
    def data_service(self):
        return {
            "id": self.id,
            "nom": self.nom,
            "description": self.description,
        }

    # pour plusieurs services
    @staticmethod
    def list_data(items):
        return [item.data_service() for item in items]


class Reseau(Base):
    # nom de la table dans la base de donnees
    __tablename__ = "reseaus"

    # attributs (colonnes) de la nomClasse Reseau (reseau)
    id = Column(Integer, primary_key=True, index=True)

    nom = Column(String, unique=False)
    url = Column(String, unique=False)

    # relations

    portfolio_id = Column(Integer, ForeignKey("portfolios.id"), nullable=True)
    portfolio = relationship("Portfolio", back_populates="reseaux")

    # donnees à voir
    def data_reseau(self):
        return {
            "id": self.id,
            "nom": self.nom,
            "url": self.url,
        }

    # pour plusieurs reseaus
    @staticmethod
    def list_data(items):
        return [item.data_reseau() for item in items]


class Contact(Base):
    # nom de la table dans la base de donnees
    __tablename__ = "contacts"

    # attributs (colonnes) de la nomClasse Contact (contact)
    id = Column(Integer, primary_key=True, index=True)

    email = Column(String, unique=False)
    telephone = Column(String, unique=False)
    message = Column(Text, unique=False)

    # relations

    portfolio_id = Column(Integer, ForeignKey("portfolios.id"), nullable=True)
    portfolio = relationship("Portfolio", back_populates="contacts")

    # donnees à voir
    def data_contact(self):
        return {
            "id": self.id,
            "email": self.email,
            "telephone": self.telephone,
            "message": self.message,
        }

    # pour plusieurs contacts
    @staticmethod
    def list_data(items):
        return [item.data_contact() for item in items]
