import os
from contextlib import asynccontextmanager
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from dotenv import load_dotenv
from psycopg_pool import AsyncConnectionPool 

load_dotenv()

engine = create_engine(os.getenv("DATABASE_URL"))
session = sessionmaker(bind=engine, autoflush=False, autocommit=False)


def get_db():
    db = session()
    try:
        yield db
    finally:
        db.close()


@asynccontextmanager
async def lifespan(app):
    dsn = os.getenv("DATABASE_URL")
    if not dsn:
        raise RuntimeError("DATABASE_URL environment variable is not set")
    pool = AsyncConnectionPool(dsn, min_size=1, max_size=10)
    await pool.open()
    app.state.pool = pool
    try:
        yield
    finally:
        await pool.close()
