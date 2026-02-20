from flask import Flask, jsonify
from flask_cors import CORS
from extensions import bcrypt, jwt
from routes.projet import projet_bp
from routes.download import download_bp


# import des blueprints
# from api.evenements import evenements_bp


from database import Base, engine

# Création d'une instance Flask
app = Flask(__name__)

# enregistrement des blueprint ici
app.register_blueprint(projet_bp)
app.register_blueprint(download_bp)


# Import de la configuration
from config import Config


# Application de la configuration
app.config.from_object(Config)


# Configuration de la clé secrète pour la session
app.secret_key = Config.SECRET_KEY


CORS(
    app,
    origins=[
        "http://localhost:5173",
    ],
    supports_credentials=True,
    methods=["GET", "POST", "PUT", "DELETE"],
    allow_headers=["Content-Type", "Authorization"],
)  # Pour utiliser l'api partout


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
