from fastapi import APIRouter

router = APIRouter()

@router.get("/")
def read_root():
    return {"status": "ok", "message": "sudicodes.xyz API is running"}

@router.get("/health")
def health_check():
    return {"status": "healthy"}