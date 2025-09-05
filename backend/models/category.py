# models/category.py
from extensions import db
from models.base import BaseModel

class Category(BaseModel):
    __tablename__ = "categories"
    
    name = db.Column(db.String(120), nullable=False)
    is_featured = db.Column(db.Boolean, default=False)