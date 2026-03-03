from database import Base, engine
from extensions import bcrypt, jwt
from flask import Flask, jsonify
from flask_cors import CORS
from handle.errors import enregistreur_erreur
from routes.datas import database_bp
from routes.download import download_bp
from routes.modele import modele_bp
from routes.projet import projet_bp

# Création d'une instance Flask
app = Flask(__name__)

# enregistrement des blueprint ici
app.register_blueprint(projet_bp)
app.register_blueprint(download_bp)
app.register_blueprint(modele_bp)
app.register_blueprint(database_bp)


# Import de la configuration
from config import Config  # noqa: E402

# Application de la configuration
app.config.from_object(Config)


# Configuration de la clé secrète pour la session
app.secret_key = Config.SECRET_KEY

CORS(
    app,
    resources={r"/api/*": {"origins": "http://localhost:5173"}},
    supports_credentials=True,
)


# Initialisation des extensions
bcrypt.init_app(app)
jwt.init_app(app)

# Gestion des erreurs api (handle errors)
enregistreur_erreur(app)

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
