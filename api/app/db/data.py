from typing import List

from app.db.configurations import collection
from app.models.product import Product

list_products: List[Product] = []

products_data = list(collection.find())
list_products = [Product(**product) for product in products_data]
