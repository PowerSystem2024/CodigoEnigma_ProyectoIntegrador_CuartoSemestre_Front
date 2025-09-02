# routes/products.py
from flask import Blueprint, jsonify, request
from models.product import Product
from extensions import db

products_bp = Blueprint("products", __name__, url_prefix="/products")

# Obtener todos los productos
@products_bp.get("/")
def get_products():
    products = Product.query.all()
    return jsonify([p.to_dict() for p in products])

# Obtener un producto por id
@products_bp.get("/<int:product_id>")
def get_product(product_id):
    product = Product.query.get(product_id)
    if not product:
        return jsonify({"error": "Producto no encontrado"}), 404
    return jsonify(product.to_dict())

# Actualizar un producto
@products_bp.put("/<int:product_id>")
def update_product(product_id):
    product = Product.query.get(product_id)
    if not product:
        return jsonify({"error": "Producto no encontrado"}), 404

    data = request.get_json() or {}
    product.update_from_dict(data)
    db.session.commit()
    return jsonify({"message": "Producto actualizado", "product": product.to_dict()})

# Eliminar un producto
@products_bp.delete("/<int:product_id>")
def delete_product(product_id):
    product = Product.query.get(product_id)
    if not product:
        return jsonify({"error": "Producto no encontrado"}), 404

    db.session.delete(product)
    db.session.commit()
    return jsonify({"message": "Producto eliminado"})

# Crear nuevo producto
@products_bp.post("/")
def create_product():
    data = request.get_json() or {}
    product = Product()
    product.update_from_dict(data)
    db.session.add(product)
    db.session.commit()
    return jsonify({"message": "Producto creado", "product": product.to_dict()}), 201