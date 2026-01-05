from flask import Blueprint, jsonify, request
from modeles.models import Portfolio
from database import get_db


# creation du blueprint_portfolio
portfolio_bp = Blueprint("portfolios", __name__, url_prefix="/api/portfolios")


# creation  d'un CRUD


# Creation de l'élément

@portfolio_bp.post("/")
def creer_ressource_portfolio():

    # Ajout du contexte de la session de la base de donnée 
    with get_db() as db:

        # creation du data_get pour recuperer les donnees du POST
        data = request.get_json()

        # creation d'une instance de la classe Portfolio
        portfolio = Portfolio(
            titre=data.get("titre"),
            description=data.get("description"),
            photo=data.get("photo"),
            localisation=data.get("localisation"),
            disponible=data.get("disponible"),
)

        # Ajout dans la session 
        db.add(portfolio)
        db.commit()

        return jsonify(portfolio.data_portfolio()), 201


# route pour voir une ressource
@portfolio_bp.get("/<int:id>")
def recuperer_ressource_portfolio(id):

    # Ajout du contexte de la session de la base de donnée 
    with get_db() as db:

        # verification de l'existence de la ressource
        portfolio = db.query(Portfolio).filter(Portfolio.id == id).first()

        if not portfolio:
            # fermeture de la session 
            return jsonify({"message": "ressource introuvable"}), 404
        
        return jsonify({"portfolio": portfolio.data_portfolio() }), 200




# route pour voir toutes les ressources
@portfolio_bp.get("/")
def recuperer_ressources_portfolio():

    # Ajout du contexte de la session de la base de donnée 
    with get_db() as db:

        # verification de l'existence de la ressource
        portfolio_list = db.query(Portfolio).all()

        if not portfolio_list:
            # fermeture de la session 
            return jsonify({"message": "ressources introuvable"}), 404

        return jsonify({"portfolios": Portfolio.list_data(portfolio_list)}), 200




# route pour supprimer une ressource 
@portfolio_bp.delete("/<int:id>")
def supprimer_ressource_portfolio(id):

    # Ajout du contexte de la session de la base de donnée 
    with get_db() as db:

        # verification de l'existence de la ressource
        portfolio = db.query(Portfolio).filter(Portfolio.id == id).first()

        if not portfolio:
            # fermeture de la session 
            return jsonify({"message": "ressource introuvable"}), 404

        db.delete(portfolio)
        db.commit()
        
        return jsonify({"message": "ressource supprimée avec succes" }), 200


# routes pour les relations


from modeles.models import Profil
# route pour voir les Profils d'une ressource Portfolio
@portfolio_bp.get("/<int:id>/profils")
def recuperer_ressource_lie_portfolio_profils(id):

    # Ajout du contexte de la session de la base de donnée 
    with get_db() as db:

        # verification de l'existence de la ressource
        ressource = db.query(Portfolio).filter(Portfolio.id == id).first()

        if not ressource:
            return jsonify({"message": "ressource introuvable"}), 404

        # recuperation  des ressources liees
        items = ressource.profils
        return jsonify({
            "profils": Profil.list_data(items)
        }), 200


from modeles.models import Competence
# route pour voir les Competences d'une ressource Portfolio
@portfolio_bp.get("/<int:id>/competences")
def recuperer_ressource_lie_portfolio_competences(id):

    # Ajout du contexte de la session de la base de donnée 
    with get_db() as db:

        # verification de l'existence de la ressource
        ressource = db.query(Portfolio).filter(Portfolio.id == id).first()

        if not ressource:
            return jsonify({"message": "ressource introuvable"}), 404

        # recuperation  des ressources liees
        items = ressource.competences
        return jsonify({
            "competences": Competence.list_data(items)
        }), 200


from modeles.models import Experience
# route pour voir les Experiences d'une ressource Portfolio
@portfolio_bp.get("/<int:id>/experiences")
def recuperer_ressource_lie_portfolio_experiences(id):

    # Ajout du contexte de la session de la base de donnée 
    with get_db() as db:

        # verification de l'existence de la ressource
        ressource = db.query(Portfolio).filter(Portfolio.id == id).first()

        if not ressource:
            return jsonify({"message": "ressource introuvable"}), 404

        # recuperation  des ressources liees
        items = ressource.experiences
        return jsonify({
            "experiences": Experience.list_data(items)
        }), 200


from modeles.models import Projet
# route pour voir les Projets d'une ressource Portfolio
@portfolio_bp.get("/<int:id>/projets")
def recuperer_ressource_lie_portfolio_projets(id):

    # Ajout du contexte de la session de la base de donnée 
    with get_db() as db:

        # verification de l'existence de la ressource
        ressource = db.query(Portfolio).filter(Portfolio.id == id).first()

        if not ressource:
            return jsonify({"message": "ressource introuvable"}), 404

        # recuperation  des ressources liees
        items = ressource.projets
        return jsonify({
            "projets": Projet.list_data(items)
        }), 200


from modeles.models import Formation
# route pour voir les Formations d'une ressource Portfolio
@portfolio_bp.get("/<int:id>/formations")
def recuperer_ressource_lie_portfolio_formations(id):

    # Ajout du contexte de la session de la base de donnée 
    with get_db() as db:

        # verification de l'existence de la ressource
        ressource = db.query(Portfolio).filter(Portfolio.id == id).first()

        if not ressource:
            return jsonify({"message": "ressource introuvable"}), 404

        # recuperation  des ressources liees
        items = ressource.formations
        return jsonify({
            "formations": Formation.list_data(items)
        }), 200


from modeles.models import Certification
# route pour voir les Certifications d'une ressource Portfolio
@portfolio_bp.get("/<int:id>/certifications")
def recuperer_ressource_lie_portfolio_certifications(id):

    # Ajout du contexte de la session de la base de donnée 
    with get_db() as db:

        # verification de l'existence de la ressource
        ressource = db.query(Portfolio).filter(Portfolio.id == id).first()

        if not ressource:
            return jsonify({"message": "ressource introuvable"}), 404

        # recuperation  des ressources liees
        items = ressource.certifications
        return jsonify({
            "certifications": Certification.list_data(items)
        }), 200


from modeles.models import Service
# route pour voir les Services d'une ressource Portfolio
@portfolio_bp.get("/<int:id>/services")
def recuperer_ressource_lie_portfolio_services(id):

    # Ajout du contexte de la session de la base de donnée 
    with get_db() as db:

        # verification de l'existence de la ressource
        ressource = db.query(Portfolio).filter(Portfolio.id == id).first()

        if not ressource:
            return jsonify({"message": "ressource introuvable"}), 404

        # recuperation  des ressources liees
        items = ressource.services
        return jsonify({
            "services": Service.list_data(items)
        }), 200


from modeles.models import Reseau
# route pour voir les Reseaus d'une ressource Portfolio
@portfolio_bp.get("/<int:id>/reseaux")
def recuperer_ressource_lie_portfolio_reseaux(id):

    # Ajout du contexte de la session de la base de donnée 
    with get_db() as db:

        # verification de l'existence de la ressource
        ressource = db.query(Portfolio).filter(Portfolio.id == id).first()

        if not ressource:
            return jsonify({"message": "ressource introuvable"}), 404

        # recuperation  des ressources liees
        items = ressource.reseaux
        return jsonify({
            "reseaux": Reseau.list_data(items)
        }), 200


from modeles.models import Contact
# route pour voir les Contacts d'une ressource Portfolio
@portfolio_bp.get("/<int:id>/contacts")
def recuperer_ressource_lie_portfolio_contacts(id):

    # Ajout du contexte de la session de la base de donnée 
    with get_db() as db:

        # verification de l'existence de la ressource
        ressource = db.query(Portfolio).filter(Portfolio.id == id).first()

        if not ressource:
            return jsonify({"message": "ressource introuvable"}), 404

        # recuperation  des ressources liees
        items = ressource.contacts
        return jsonify({
            "contacts": Contact.list_data(items)
        }), 200




    