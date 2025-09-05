# routes/users.py
from flask import Blueprint, jsonify, request
from models.user import User
from extensions import db

users_bp = Blueprint("users", __name__, url_prefix="/users")

@users_bp.get("/")
def get_users():
    users = User.query.all()
    return jsonify([u.to_dict() for u in users])

@users_bp.get("/<int:user_id>")
def get_user(user_id):
    user = User.query.get(user_id)
    if not user:
        return jsonify({"error": "Usuario no encontrado"}), 404
    return jsonify(user.to_dict())

@users_bp.put("/<int:user_id>")
def update_user(user_id):
    user = User.query.get(user_id)
    if not user:
        return jsonify({"error": "Usuario no encontrado"}), 404

    data = request.get_json() or {}
    user.update_from_dict(data)
    db.session.commit()
    return jsonify({"message": "Usuario actualizado", "user": user.to_dict()})

@users_bp.delete("/<int:user_id>")
def delete_user(user_id):
    user = User.query.get(user_id)
    if not user:
        return jsonify({"error": "Usuario no encontrado"}), 404

    db.session.delete(user)
    db.session.commit()
    return jsonify({"message": "Usuario eliminado"})

@users_bp.post("/")
def create_user():
    data = request.get_json() or {}
    user = User()
    user.update_from_dict(data)
    db.session.add(user)
    db.session.commit()
    return jsonify({"message": "Usuario creado", "user": user.to_dict()}), 201
