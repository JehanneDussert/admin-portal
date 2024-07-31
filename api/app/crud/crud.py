import json
from datetime import datetime, timezone
from pathlib import Path
from typing import List

from fastapi import HTTPException

from app.models.product import Product, ProductsResponse


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
file_path = current_dir / "../../data/products.json"
list_products = load_products_from_file(file_path)

#   Save deleted products for restoration
deleted_products: List[Product] = [
    product for product in list_products if product.is_deleted
]

#   Save restore products to replay deletion
redo_products: List[Product] = []

#   ---------------------
#       GET products
#   ---------------------


#   Return all the available products
def get_products() -> ProductsResponse:
    return {
        "products": list_products,
        "redo_products": redo_products,
    }


#   Return a product identified by its id
def get_product_by_id(product_id: int) -> Product:

    if product_id >= len(list_products):
        raise HTTPException(
            status_code=404,
            detail="Product not found",
        )

    return list_products[product_id]


#   -------------------------
#       UPDATE products
#   -------------------------


#   Update one product and return it
def update_product(product: Product) -> Product:

    if product.id >= len(list_products):
        raise HTTPException(
            status_code=404,
            detail="Product not found",
        )

    product.last_modified = datetime.now(timezone.utc).strftime(
        "%Y-%m-%d %H:%M:%S"
    )

    list_products[product.id] = product

    return product


#   -------------------------
#       DELETE products
#   -------------------------


#   Delete a product identified by its id and return updated list
def delete_product(
    product_id: int,
) -> List[Product]:

    if product_id >= len(list_products):
        raise HTTPException(
            status_code=404,
            detail="Product not found",
        )

    list_products[product_id].is_deleted = True
    deleted_products.append(list_products[product_id])

    return list_products


#   Restore last deleted product and return updated list
def restore_product(
    product_id: int,
) -> ProductsResponse:

    if not deleted_products:
        raise HTTPException(
            status_code=404,
            detail="No product to restore",
        )

    product_to_restore = next(
        (
            product
            for product in deleted_products
            if product.id == product_id
        ),
        None,
    )

    if not product_to_restore:
        raise HTTPException(
            status_code=404,
            detail="Product to restore does not existe",
        )

    product_to_restore.is_deleted = False
    deleted_products.remove(product_to_restore)
    redo_products.append(product_to_restore)

    return { "products": list_products, "redo_products": redo_products }


#   Replay product deletion and return updated list
def redo_product() -> List[Product]:

    if not redo_products:
        raise HTTPException(
            status_code=404,
            detail="No product to redo",
        )

    product_to_redo = redo_products.pop()
    product_to_redo.is_deleted = True

    deleted_products.append(product_to_redo)

    return { "products": list_products, "redo_products": redo_products }
