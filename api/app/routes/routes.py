from fastapi import APIRouter, Path, Query
from typing import List
from app.models.product import Product
from app.crud.crud import (list_products, deleted_products, redo_stack,
                                   get_products, get_product_by_id, delete_product,
                                   restore_product, redo_product, update_product)

router = APIRouter()

@router.get("/products", response_model=List[Product])
async def get_products_list():
    return get_products()

@router.get("/deleted_products", response_model=List[Product])
async def get_deleted_products_list():
    return deleted_products

@router.get("/redo_products", response_model=List[Product])
async def get_redo_products_list():
    return redo_stack

@router.get("/products/{product_id}", response_model=Product)
async def get_product(product_id: int = Path(..., ge=0)):
    return get_product_by_id(product_id)

@router.get("/products_by_name", response_model=List[Product])
async def get_products_by_name(product_name: str = Query(None)):
    if product_name:
        filtered_products = [product for product in list_products
                             if product_name.lower() in product.title.lower()]
        return filtered_products
    return list_products

@router.delete("/delete_product", response_model=List[Product])
async def delete_product_by_id(product_id: int):
    return delete_product(product_id)

@router.post("/restore_product", response_model=List[Product])
async def restore_product_endpoint():
    return restore_product()

@router.post("/redo_product", response_model=List[Product])
async def redo_product_endpoint():
    return redo_product()

@router.put("/products/{product_id}", response_model=Product)
async def update_product_endpoint(product: Product):
    return update_product(product)
