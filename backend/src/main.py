from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import os
from src.router import experience_router, role_router
from src.router import health_check_router, mailing_list_router

app = FastAPI()

origins = os.environ.get("ALLOWED_ORIGINS", "*").split(",")

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(health_check_router.router)
app.include_router(mailing_list_router.router)
app.include_router(experience_router.router)
app.include_router(role_router.router)