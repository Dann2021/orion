import os
from dotenv import load_dotenv

# Charge les variables d’environnement définies dans le fichier .env
# afin de ne pas stocker les informations sensibles (mots de passe, clés secrètes, URLs)
# directement dans le code source.
load_dotenv()

class Config:

    # API Flask
    API_KEY = os.getenv("API_KEY") or "api_key" 
    SECRET_KEY = os.getenv("SECRET_KEY") or "secret_key"
    JWT_SECRET_KEY = os.getenv("JWT_SECRET_KEY") or os.getenv("JWT_SECRET") or "jwt_secret"



# Fichier créé par Dann Sloann 