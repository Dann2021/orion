# database.py
import os
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base
from contextlib import contextmanager


DATABASE_URL = os.getenv("DATABASE_URL","postgresql+psycopg2://admin:admin@localhost:5432/db")

engine = create_engine(
    DATABASE_URL,
    pool_pre_ping=True)

Base = declarative_base()

SessionLocal = sessionmaker(
    bind=engine,
    autocommit=False,
    autoflush=False
)

@contextmanager
def get_db():
    db = SessionLocal()
    try:
        yield db
    except Exception as ex:
        db.rollback() # Permet d'annuler les changements effectués dans la session en cas d'erreur
        raise ex
    finally:
        db.close()

# Fichier créé par ダニーズ・スカイロック