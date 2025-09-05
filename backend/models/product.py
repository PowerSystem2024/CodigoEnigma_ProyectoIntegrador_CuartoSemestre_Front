# models/product.py
from extensions import db
from models.base import BaseModel

class Product(BaseModel):
    __tablename__ = "products"
    
    name = db.Column(db.String(120), nullable=False)
    price = db.Column(db.Float, nullable=False)
    description = db.Column(db.String(500), nullable=True)
    image_url = db.Column(db.String(120), nullable=True)