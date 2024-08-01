import json
from pathlib import Path
from typing import List

from app.db.configurations import collection
from app.models.product import Product

collection.delete_many({})


def load_products_from_file(
    file_path: str,
) -> List[Product]:
    with open(file_path, "r", encoding="utf-8") as f:
        products_data = json.load(f)
    products = [Product(**product) for product in products_data]

    for product in products:
        product.calculate_average_rate()

    return products


current_dir = Path(__file__).resolve().parent
file_path = current_dir / "products.json"
list_products = load_products_from_file(file_path)
products_dicts = [product.dict() for product in list_products]
collection.insert_many(products_dicts)
