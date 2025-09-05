from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_cors import CORS
from routes.users import users_bp
from routes.products import products_bp
from routes.categories import categories_bp
from extensions import db

app = Flask(__name__)
app.config.from_object("config")

db.init_app(app)
migrate = Migrate(app, db)
CORS(app)

app.register_blueprint(users_bp)
app.register_blueprint(products_bp)
app.register_blueprint(categories_bp)

if __name__ == "__main__":
    app.run(debug=True)