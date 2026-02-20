from datetime import timedelta
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


    # Ceci ne concerne que l'extension JWT_EXTENDED
    JWT_ACCESS_TOKEN_EXPIRES = timedelta(minutes=720)
    JWT_REFRESH_TOKEN_EXPIRES = timedelta(days=60)
    JWT_TOKEN_LOCATION = ["headers", "cookies"]
    JWT_COOKIE_SECURE = True  # Mettre True en production
    JWT_COOKIE_HTTPONLY = True
    JWT_COOKIE_SAMESITE = "Lax"
    JWT_COOKIE_CSRF_PROTECT = False
    JWT_ACCESS_COOKIE_PATH = "/"
    JWT_REFRESH_COOKIE_PATH = "/token/refresh"

# Fichier créé par Dann Sloann 