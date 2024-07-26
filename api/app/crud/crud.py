from typing import List
from app.models.product import Product
from fastapi import HTTPException

list_products = [
    Product(title="Tomate", desc="Une description", id=0),
    Product(title="Patate", desc="Une description", id=1),
    Product(title="Salade", desc="Une description", id=2),
    Product(title="Avocat", desc="Une description", id=3),
    Product(title="Asperge", desc="Une description", id=4),
    Product(title="Potimaron", desc="Une description", id=5),
]

deleted_products: List[Product] = []
redo_stack: List[Product] = []

def get_products() -> List[Product]:
    return list_products

def get_product_by_id(product_id: int) -> Product:
    if product_id >= len(list_products):
        raise HTTPException(status_code=404, detail="Product not found")
    return list_products[product_id]

def delete_product(product_id: int) -> List[Product]:
    if product_id >= len(list_products):
        raise HTTPException(status_code=404, detail="Product not found")
    product_to_delete = list_products.pop(product_id)
    deleted_products.append(product_to_delete)
    for index, product in enumerate(list_products):
        product.id = index
    return list_products

def restore_product() -> List[Product]:
    if not deleted_products:
        raise HTTPException(status_code=404, detail="No product to restore")
    product_to_restore = deleted_products.pop()
    redo_stack.append(product_to_restore)
    product_to_restore.id = len(list_products)
    list_products.append(product_to_restore)
    for index, product in enumerate(list_products):
        product.id = index
    return list_products

def redo_product() -> List[Product]:
    if not redo_stack:
        raise HTTPException(status_code=404, detail="No product to redo")
    product_to_redo = redo_stack.pop()
    if product_to_redo in list_products:
        list_products.remove(product_to_redo)
    deleted_products.append(product_to_redo)
    for index, product in enumerate(list_products):
        product.id = index
    return list_products

def update_product(product: Product) -> Product:
    if product.id >= len(list_products):
        raise HTTPException(status_code=404, detail="Product not found")
    list_products[product.id] = product
    return product
