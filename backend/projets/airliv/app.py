from flask import Flask, jsonify, render_template
from flask_cors import CORS
from extensions import bcrypt
from erreurs.handle_erreurs import enregistreur_erreur
from database import Base, engine

from routes.utilisateur import utilisateur_bp
from routes.publication import publication_bp



# Création de l'application
app = Flask(__name__)


# Chargement de la configuration
from config import Config
app.config.from_object(Config)

# Clé secrète (sessions, cookies, signer)
app.secret_key = Config.SECRET_KEY


# Initialisation des extensions
bcrypt.init_app(app)




# Middlewares
CORS(
    app,
    origins="*",
    methods=["GET", "POST", "PUT", "DELETE"],
    allow_headers=["Content-Type", "Authorization"],
)


# Enregistrement des blueprints
app.register_blueprint(utilisateur_bp)
app.register_blueprint(publication_bp)


# Gestion des erreurs
enregistreur_erreur(app)

# Initialisation de la base de données
try:
    Base.metadata.create_all(bind=engine)
    print("✅ Base de données connectée et tables créées")
except Exception as ex:
    print("❌ Erreur de base de données :", ex)


# Routes globales
@app.route("/")
def hello():
    return render_template("index.html")



# Lancement de l'application
if __name__ == "__main__":
    app.run(host="0.0.0.0", debug=True)

# Fichier créé par Dann Sloann