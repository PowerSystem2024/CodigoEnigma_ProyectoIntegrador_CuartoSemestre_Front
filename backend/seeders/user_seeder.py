from app import db
from models.user import User

def run():
    rows = [
        User(name="Lauti", email="lauti@example.com"),
        User(name="Aron", email="aron@example.com"),
        User(name="Dilan", email="dilan@example.com"),
        User(name="Eli", email="eli@example.com"),
        User(name="Fran", email="fran@example.com"),
        User(name="Juan", email="juan@example.com"),
        User(name="Ro", email="ro@example.com"),
        User(name="Guardini", email="guardini@example.com"),
        User(name="Agus", email="agus@example.com"),
    ]
    db.session.bulk_save_objects(rows)
    db.session.commit()
    print("Users seed OK")