from datetime import datetime, timezone
from typing import List

from fastapi import HTTPException

from app.db.configurations import collection
from app.db.data import list_products
from app.models.product import Product, ProductsResponse, Review

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
    return ProductsResponse(
        products=list_products, redo_products=redo_products
    )


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
        "%Y-%m-%d",
    )

    product.reviews = [
        Review(**review) if isinstance(review, dict) else review
        for review in product.reviews
    ]

    list_products[product.id] = product

    update = collection.update_one(
        {"id": product.id}, {"$set": product.model_dump()}
    )

    if update.modified_count == 0:
        raise HTTPException(
            status_code=500, detail="Failed to update product in database"
        )

    return product


#   -------------------------
#       DELETE products
#   -------------------------


#   Delete a product identified by its id and return updated list
def delete_product(product_id: int) -> List[Product]:
    if product_id >= len(list_products):
        raise HTTPException(status_code=404, detail="Product not found")

    product = list_products[product_id]
    product.is_deleted = True
    product.last_modified = datetime.now(timezone.utc).strftime(
        "%Y-%m-%d",
    )
    product.reviews = [
        Review(**review) if isinstance(review, dict) else review
        for review in product.reviews
    ]

    deleted_products.append(product)
    redo_products.clear()

    list_products[product_id] = product

    update = collection.update_one(
        {"id": product.id}, {"$set": product.model_dump()}
    )

    if update.modified_count == 0:
        raise HTTPException(
            status_code=500, detail="Failed to update product in database"
        )

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
    product_to_restore.last_modified = datetime.now(timezone.utc).strftime(
        "%Y-%m-%d",
    )
    product_to_restore.reviews = [
        Review(**review) if isinstance(review, dict) else review
        for review in product_to_restore.reviews
    ]

    deleted_products.remove(product_to_restore)
    redo_products.append(product_to_restore)

    update = collection.update_one(
        {"id": product_to_restore.id},
        {"$set": product_to_restore.model_dump()},
    )

    if update.modified_count == 0:
        raise HTTPException(
            status_code=500, detail="Failed to update product in database"
        )

    return ProductsResponse(
        products=list_products, redo_products=redo_products
    )


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

    return ProductsResponse(
        products=list_products, redo_products=redo_products
    )