from app import app
from seeders import user_seeder, product_seeder

if __name__ == "__main__":
    with app.app_context():
        print("🌱 Running seeders...")
        user_seeder.run()
        product_seeder.run()