from sqlalchemy import create_engine
from sqlalchemy.orm import declarative_base, sessionmaker

# creation du chemin vers la base de donnees
DATABASE_URL = "sqlite:///database.db"


# creation de la base de données
Base = declarative_base()

# creation du moteur
engine = create_engine(DATABASE_URL, echo=True)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
