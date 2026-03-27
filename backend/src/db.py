import os
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from dotenv import load_dotenv

load_dotenv()

engine = create_engine(os.getenv("DATABASE_URL"))
session = sessionmaker(bind=engine, autoflush=False, autocommit=False)

def get_db():
    db = session()
    try:
        yield db
    finally:
        db.close()