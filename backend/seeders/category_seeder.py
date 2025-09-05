from app import db
from models.category import Category

def run():
    rows = [
        Category(name="Plantas de Interior", is_featured=0)
    ]
    db.session.bulk_save_objects(rows)
    db.session.commit()
    print("Categories seed OK")