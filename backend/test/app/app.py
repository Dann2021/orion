from database import Base, SessionLocal, engine
from modeles import User

# creation des objets


# enregistrement dans la base de données


def create_tables():
    print("Creations des tables...")
    Base.metadata.create_all(bind=engine)
    print("Tables créées avec succès!")


# Ajout de l'utilisateur à la session
def add_users():

    session = SessionLocal()

    try:
        user1 = User(nom="Dannys", age=27)
        user2 = User(nom="Dann", age=27)
        session.add_all([user1, user2])
        session.commit()
        print("Utilisateurs ajoutés avec succès!")
    except Exception as e:
        session.rollback()
        print(f"Erreur lors de l'ajout des utilisateurs: {e}")
    finally:
        session.close()
