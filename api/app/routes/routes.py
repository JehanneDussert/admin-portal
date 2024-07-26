from fastapi import APIRouter, Path, Query
from typing import List
from app.models.product import Product
from datetime import datetime
from app.crud.crud import (list_products, deleted_products, redo_stack,
                                   get_products, get_product_by_id, delete_product,
                                   restore_product, redo_product, update_product)

router = APIRouter()

#   ---------------
#         GET
#   ---------------

#   Return all the available products
@router.get("/products", response_model=List[Product])
async def get_products_list():
    return get_products()

#   Return a product identified by its title
@router.get("/products_by_name", response_model=List[Product])
async def get_products_by_name(product_name: str = Query(None)):
    if product_name:
        filtered_products = [product for product in list_products
                             if product_name.lower() in product.title.lower()]
        return filtered_products
    return list_products

#   Return products sorted by date
@router.get("/products/sort_by_date", response_model=List[Product])
def get_products_sorted_by_date() -> List[Product]:
    sorted_products = sorted(
        list_products,
        key=lambda p: datetime.strptime(p.last_modified, '%Y-%m-%d') if p.last_modified else datetime.min,
        reverse=True
    )
    return sorted_products

#   Return products sorted by rate
@router.get("/products/sort_by_rate", response_model=List[Product])
def get_products_sorted_by_rate() -> List[Product]:
    sorted_products = sorted(list_products, key=lambda p: p.average_rate, reverse=True)
    
    return sorted_products

# #   Return products sorted by name
@router.get("/products/sort_by_name", response_model=List[Product])
def get_products_sorted_by_name() -> List[Product]:
    sorted_products = sorted(list_products, key=lambda p: p.title.lower())
    print(sorted_products)
    return sorted_products

#   Return a product identified by its id
@router.get("/products/{product_id}", response_model=Product)
async def get_product(product_id: int = Path(..., ge=0)):
    return get_product_by_id(product_id)

#   Return all the deleted products
@router.get("/deleted_products", response_model=List[Product])
async def get_deleted_products_list():
    return deleted_products

#   Return all the restorable products
@router.get("/redo_products", response_model=List[Product])
async def get_redo_products_list():
    return redo_stack

#   ---------------
#        POST
#   ---------------

#   Undo last product deletion
@router.post("/restore_product", response_model=List[Product])
async def restore_product_endpoint():
    return restore_product()

#   Redo last restored product deletion
@router.post("/redo_product", response_model=List[Product])
async def redo_product_endpoint():
    return redo_product()

#   ---------------
#         PUT
#   ---------------

#   Update one product identified by its id
@router.put("/products/{product_id}", response_model=Product)
async def update_product_endpoint(product: Product):
    return update_product(product)

#   ---------------
#       DELETE
#   ---------------

#   Delete one product identified by its id
@router.delete("/delete_product/{product_id}", response_model=List[Product])
async def delete_product_by_id(product_id: int = Path(..., ge=0)):
    return delete_product(product_id)
