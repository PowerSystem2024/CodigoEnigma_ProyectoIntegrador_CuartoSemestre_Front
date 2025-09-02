# models/base.py
from extensions import db

class BaseModel(db.Model):
    __abstract__ = True

    id = db.Column(db.Integer, primary_key=True)

    def to_dict(self):
        return {c.name: getattr(self, c.name) for c in self.__table__.columns}

    def update_from_dict(self, data):
        for key in data:
            if hasattr(self, key):
                setattr(self, key, data[key])