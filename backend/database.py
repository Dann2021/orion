# database.py
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base
from contextlib import contextmanager

DATABASE_URL = "sqlite:///database.db"

engine = create_engine(
    DATABASE_URL, connect_args={"check_same_thread": False}, pool_pre_ping=True
)

Base = declarative_base()

SessionLocal = sessionmaker(bind=engine, autocommit=False, autoflush=False)


@contextmanager
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
