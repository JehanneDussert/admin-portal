from datetime import datetime
from typing import List

from fastapi import APIRouter, HTTPException, Path, Query

from app.crud.crud import (delete_product, get_product_by_id, get_products,
                           redo_product, redo_products, restore_product,
                           update_product)
from app.db.configurations import collection
from app.db.data import list_products
from app.models.product import Product, ProductsResponse

router = APIRouter()


@router.get("/")
def check_api():
    return "API is running"


@router.get("/db")
async def check_db():
    products_data = list(collection.find())
    list_products = [Product(**product) for product in products_data]

    return list_products


#   ---------------
#         GET
#   ---------------


@router.post("/db")
async def create_product(new_product: Product):
    try:
        resp = collection.insert_one(dict(new_product))

        return {"status_code": 200, "id": str(resp.inserted_id)}
    except Exception as e:
        raise HTTPException(
            status_code=500, detail=f"Some error occurred: {e}"
        )


#   Return all the products
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
        return ProductsResponse(
            products=filtered_products, redo_products=redo_products
        )

    return ProductsResponse(
        products=list_products, redo_products=redo_products
    )


#   Return products sorted by date
@router.get(
    "/products/sort_by_date",
    response_model=ProductsResponse,
)
def get_products_sorted_by_date():
    sorted_products = sorted(
        list_products,
        key=lambda p: (
            datetime.strptime(p.last_modified, "%Y-%m-%d")
            if p.last_modified
            else datetime.min
        ),
        reverse=True,
    )

    return ProductsResponse(
        products=sorted_products, redo_products=redo_products
    )


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

    return ProductsResponse(
        products=sorted_products, redo_products=redo_products
    )


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

    return ProductsResponse(
        products=sorted_products, redo_products=redo_products
    )


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

    return ProductsResponse(
        products=list_products, redo_products=redo_products
    )


#   Redo last restored product deletion
@router.post(
    "/redo_product",
    response_model=ProductsResponse,
)
async def redo_product_endpoint() -> ProductsResponse:
    redo_product()

    return ProductsResponse(
        products=list_products, redo_products=redo_products
    )


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
    "/delete_product/{product_id}", response_model=ProductsResponse
)
async def delete_product_by_id(
    product_id: int = Path(..., ge=0)
) -> ProductsResponse:
    delete_product(product_id)

    return ProductsResponse(
        products=list_products, redo_products=redo_products
    )
