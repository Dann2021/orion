from flask import Flask, jsonify, request
from flask_cors import CORS
from extensions import bcrypt, jwt
from routes.portfolio import portfolio_bp
from routes.profil import profil_bp
from routes.competence import competence_bp
from routes.experience import experience_bp
from routes.projet import projet_bp
from routes.formation import formation_bp
from routes.certification import certification_bp
from routes.service import service_bp
from routes.reseau import reseau_bp
from routes.contact import contact_bp




from database import Base, engine

# Création d'une instance Flask
app = Flask(__name__)

# enregistrement des blueprint ici
app.register_blueprint(portfolio_bp)
app.register_blueprint(profil_bp)
app.register_blueprint(competence_bp)
app.register_blueprint(experience_bp)
app.register_blueprint(projet_bp)
app.register_blueprint(formation_bp)
app.register_blueprint(certification_bp)
app.register_blueprint(service_bp)
app.register_blueprint(reseau_bp)
app.register_blueprint(contact_bp)



# Import de la configuration
from config import Config


# Application de la configuration
app.config.from_object(Config)


# Configuration de la clé secrète pour la session
app.secret_key = Config.SECRET_KEY





CORS(
    app,
    origins="*",
    methods=["GET", "POST", "PUT", "DELETE"],
    allow_headers=["Content-Type", "Authorization"],
)



# Initialisation des extensions
bcrypt.init_app(app)
jwt.init_app(app)


# Authentification google fait  18/05/2025



# Création des tables
try:
    Base.metadata.create_all(bind=engine)
    print("✅ Base de données connectée et tables créées")
except Exception as ex:
    print("❌ Erreur de base de données :", ex)


@app.route("/")
def hello():
    return jsonify({"message": "Hello bienvenue dans mon api"}), 200





if __name__ == "__main__":
    app.run(host="0.0.0.0", debug=True)