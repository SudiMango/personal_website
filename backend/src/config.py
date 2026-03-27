import os
from dotenv import load_dotenv

load_dotenv()

ADMIN_USERNAME = os.getenv("ADMIN_USERNAME")
ADMIN_PASSWORD_HASH = os.getenv("ADMIN_PASSWORD_HASH")
ADMIN_SECRET_KEY = os.getenv("ADMIN_SECRET_KEY")
ADMIN_COOKIE_NAME = "admin_session"
ADMIN_COOKIE_MAX_AGE = 60*60*12
IS_PROD = os.getenv("ENVIRONMENT", "dev").lower() == "prod"