# routes/categories.py
from flask import Blueprint, jsonify, request
from models.category import Category
from extensions import db

categories_bp = Blueprint("categories", __name__, url_prefix="/categories")

# Obtener todas las categorías
@categories_bp.get("/")
def get_categories():
    categories = Category.query.all()
    return jsonify([c.to_dict() for c in categories])

# Obtener una categoría por id
@categories_bp.get("/<int:category_id>")
def get_category(category_id):
    category = Category.query.get(category_id)
    if not category:
        return jsonify({"error": "Categoría no encontrada"}), 404
    return jsonify(category.to_dict())

# Actualizar una categoría
@categories_bp.put("/<int:category_id>")
def update_category(category_id):
    category = Category.query.get(category_id)
    if not category:
        return jsonify({"error": "Categoría no encontrada"}), 404

    data = request.get_json() or {}
    category.update_from_dict(data)
    db.session.commit()
    return jsonify({"message": "Categoría actualizada", "category": category.to_dict()})

# Eliminar una categoría
@categories_bp.delete("/<int:category_id>")
def delete_category(category_id):
    category = Category.query.get(category_id)
    if not category:
        return jsonify({"error": "Categoría no encontrada"}), 404

    db.session.delete(category)
    db.session.commit()
    return jsonify({"message": "Categoría eliminada"})

# Crear nueva categoría
@categories_bp.post("/")
def create_category():
    data = request.get_json() or {}
    category = Category()
    category.update_from_dict(data)
    db.session.add(category)
    db.session.commit()
    return jsonify({"message": "Categoría creada", "category": category.to_dict()}), 201
