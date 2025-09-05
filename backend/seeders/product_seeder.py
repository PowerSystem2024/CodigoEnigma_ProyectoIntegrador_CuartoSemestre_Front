from app import db
from models.product import Product

def run():
    rows = [
        Product(
            name="Ficus Lyrata",
            price="8500.00",
            description="Planta de interior popular conocida como Higuera de hojas de violín. Ideal para espacios luminosos.",
            image_url="https://florastore.com/cdn/shop/files/3313211_Productimage_01_SQ_c5567bfa-4772-47cb-a2aa-bc533d84e5b7.jpg"
        ),
        Product(
            name="Monstera Deliciosa",
            price="7200.00",
            description="Planta tropical de gran follaje con hojas perforadas. Perfecta para decoración de interiores.",
            image_url="https://florastore.com/cdn/shop/files/1711701_Productimage_02_SQ.jpg"
        ),
        Product(
            name="Cactus Euphorbia Ingens",
            price="2500.00",
            description="Cactus resistente de fácil cuidado, ideal para interiores y exteriores.",
            image_url="https://florastore.com/cdn/shop/files/2021171_Productimage_02_SQ.jpg"
        ),
        Product(
            name="Portamacetas 3 niveles",
            price="18000.00",
            description="Un hermoso portamacetas de 3 niveles negro para plantas de interior",
            image_url="https://florastore.com/cdn/shop/files/3131004_Atmosphere_01_SQ_2c1c34bc-5a5d-4d9a-a86d-e4597b2de663.jpg"
        ),
        Product(
            name="Concentrado para el control de malezas",
            price="950.00",
            description="Con el Concentrado Control de Malezas Pokon, puedes eliminar rápida y fácilmente las malas hierbas anuales indeseadas, como la pamplina, el berro y la ortiga.",
            image_url="https://florastore.com/cdn/shop/files/9800002_Productimage_02_SQ.png"
        ),
        Product(
            name="Tierra fértil 10kg",
            price="2100.00",
            description="Bolsa de tierra abonada lista para macetas y jardines.",
            image_url="https://florastore.com/cdn/shop/files/9826001_Productimage_02_SQ.png"
        ),
        Product(
            name="Musa Oriental",
            price="3200.00",
            description="La planta de plátano de interior, también llamada Musa Oriental Dwarf, es originaria del sudeste asiático y Australia. Es una planta de interior tropical con hermosas hojas verdes grandes.",
            image_url="https://florastore.com/cdn/shop/files/3110121_Productimage_02_SQ.jpg"
        ),
        Product(
            name="Orquídea Phalaenopsis",
            price="12500.00",
            description="Orquídea elegante de flores duraderas, disponible en varios colores.",
            image_url="https://florastore.com/cdn/shop/files/3514301_Productimage_02_SQ.jpg"
        ),
        Product(
            name="Suculenta mix (3 unidades)",
            price="3100.00",
            description="Pack de 3 suculentas variadas en macetas pequeñas, de bajo mantenimiento.",
            image_url="https://florastore.com/cdn/shop/files/2513003_Productimage_03_SQ.png"
        ),
        Product(
            name="Eucalipto Pulverulenta (2 unidades)",
            price="4600.00",
            description="El Eucalyptus Pulverulenta Baby Blue es originario del sureste de Australia y es la comida favorita de los koalas.",
            image_url="https://florastore.com/cdn/shop/files/1530192_Productimage_02_SQ.jpg"
        )
    ]

    db.session.bulk_save_objects(rows)
    db.session.commit()
    print("🌱 Products seed OK")


