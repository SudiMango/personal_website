from typing import TypeVar, Generic, Type, List, Optional
from uuid import UUID
from sqlalchemy.orm import Session
from pydantic import BaseModel
from src.model.base import Base

# T is the SQLAlchemy Model, U is the Pydantic Update Schema
T = TypeVar("T", bound=Base)
U = TypeVar("U", bound=BaseModel)

class CrudRepository(Generic[T, U]):
    def __init__(self, model: Type[T]):
        self.model = model

    def create(self, db: Session, obj_in: T) -> T:
        db.add(obj_in)
        db.commit()
        db.refresh(obj_in)
        return obj_in
    
    def get_all(self, db: Session) -> List[T]:
        return db.query(self.model).all()

    def get_one(self, db: Session, id: UUID) -> Optional[T]:
        pk_name = f"{self.model.__tablename__}_id"
        return db.query(self.model).filter(getattr(self.model, pk_name) == id).first()

    def update(self, db: Session, db_obj: T, obj_in: U) -> T:
        update_data = obj_in.model_dump(exclude_unset=True)
        for field in update_data:
            setattr(db_obj, field, update_data[field])
        db.commit()
        db.refresh(db_obj)
        return db_obj

    def delete(self, db: Session, db_obj: T) -> None:
        db.delete(db_obj)
        db.commit()