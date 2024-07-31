from datetime import datetime
from typing import List

from fastapi import APIRouter, Path, Query

from app.crud.crud import (delete_product, get_product_by_id, get_products,
                           list_products, redo_product, redo_stack,
                           restore_product, update_product)
from app.models.product import Product, ProductsResponse

router = APIRouter()

#   ---------------
#         GET
#   ---------------


#   Return all the available products
@router.get("/products", response_model=ProductsResponse)
async def get_products_list() -> ProductsResponse:
    return get_products()


#   Return a product identified by its title
@router.get(
    "/search_by_name",
    response_model=ProductsResponse,
)
async def get_products_searched_by_name(
    product_name: str = Query(None),
) -> ProductsResponse:
    if product_name:
        filtered_products = [
            product
            for product in list_products
            if product_name.lower() in product.title.lower()
        ]
        return {
            "products": filtered_products,
            "redo_products": redo_stack,
        }

    return {
        "products": list_products,
        "redo_products": redo_stack,
    }


#   Return products sorted by date
@router.get(
    "/products/sort_by_date",
    response_model=ProductsResponse,
)
def get_products_sorted_by_date() -> ProductsResponse:
    sorted_products = sorted(
        list_products,
        key=lambda p: (
            datetime.strptime(p.last_modified, "%Y-%m-%d")
            if p.last_modified
            else datetime.min
        ),
        reverse=True,
    )

    return {
        "products": sorted_products,
        "redo_products": redo_stack,
    }


#   Return products sorted by rate
@router.get(
    "/products/sort_by_rate",
    response_model=ProductsResponse,
)
def get_products_sorted_by_rate() -> ProductsResponse:
    sorted_products = sorted(
        list_products,
        key=lambda p: p.average_rate,
        reverse=True,
    )

    return {
        "products": sorted_products,
        "redo_products": redo_stack,
    }


#   Return products sorted by name
@router.get(
    "/products/sort_by_name",
    response_model=ProductsResponse,
)
def get_products_sorted_by_name() -> ProductsResponse:
    sorted_products = sorted(
        list_products,
        key=lambda p: p.title.lower(),
    )

    return {
        "products": sorted_products,
        "redo_products": redo_stack,
    }


#   Return a product identified by its id
@router.get(
    "/products/{product_id}",
    response_model=Product,
)
async def get_product(product_id: int = Path(..., ge=0)) -> List[Product]:
    return get_product_by_id(product_id)


#   ---------------
#        POST
#   ---------------


#   Undo last product deletion
@router.post(
    "/restore_product/{product_id}",
    response_model=ProductsResponse,
)
async def restore_product_endpoint(
    product_id: int = Path(..., ge=0)
) -> ProductsResponse:
    restore_product(product_id)

    return {
        "products": list_products,
        "redo_products": redo_stack,
    }


#   Redo last restored product deletion
@router.post(
    "/redo_product",
    response_model=ProductsResponse,
)
async def redo_product_endpoint() -> ProductsResponse:
    redo_product()

    return {
        "products": list_products,
        "redo_products": redo_stack,
    }


#   ---------------
#         PUT
#   ---------------


#   Update one product identified by its id
@router.put(
    "/products/{product_id}",
    response_model=Product,
)
async def update_product_endpoint(
    product: Product,
) -> Product:
    return update_product(product)


#   ---------------
#       DELETE
#   ---------------


#   Delete one product identified by its id
@router.delete(
    "/delete_product/{product_id}",
    response_model=List[Product],
)
async def delete_product_by_id(
    product_id: int = Path(..., ge=0)
) -> List[Product]:
    return delete_product(product_id)
