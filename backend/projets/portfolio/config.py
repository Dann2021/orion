import os
from dotenv import load_dotenv
from datetime import timedelta

load_dotenv()


class Config:
    # API Flask
    API_KEY = os.getenv("API_KEY") or "api_key" 
    SECRET_KEY = os.getenv("SECRET_KEY") or "secret_key"
    JWT_SECRET = os.getenv("JWT_SECRET") or "jwt_secret"






# Fichier créé par Dann Sloann 