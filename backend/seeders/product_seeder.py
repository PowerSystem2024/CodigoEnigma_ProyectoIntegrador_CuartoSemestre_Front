from app import db
from models.product import Product

def run():
    rows = [
        Product(name="Product A", price="123.00", description="Este producto es el producto A!"),
        Product(name="Product B", price="123.00", description="Este producto es el producto B!"),
        Product(name="Product C", price="123.00", description="Este producto es el producto C!"),
    ]
    db.session.bulk_save_objects(rows)
    db.session.commit()
    print("Products seed OK")