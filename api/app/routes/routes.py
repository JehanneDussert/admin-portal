from fastapi import APIRouter, Path, Query
from typing import List
from app.models.product import Product, ProductsResponse
from datetime import datetime
from app.crud.crud import (list_products, deleted_products, redo_stack,
                           get_products, get_product_by_id, delete_product,
                           restore_product, redo_product, update_product)

router = APIRouter()

def paginate_products(products: List[Product], page: int, size: int) -> List[Product]:
    start = (page - 1) * size
    end = start + size
    return products[start:end]

#   ---------------
#         GET
#   ---------------

@router.get("/products", response_model=ProductsResponse)
async def get_products_list(page: int = Query(1), size: int = Query(9)) -> ProductsResponse:
    start = (page - 1) * size
    end = start + size
    paginated_products = list_products[start:end]
    
    return { 
            'products': paginated_products, 
            'deleted_products': deleted_products, 
            'redo_products': redo_stack, 
            'total_products': len(list_products) 
    }

@router.get("/products_by_name", response_model=ProductsResponse)
async def get_products_by_name(product_name: str = Query(None), page: int = Query(1, ge=1), size: int = Query(9, ge=1)) -> ProductsResponse:
    if product_name:
        filtered_products = [product for product in list_products
                             if product_name.lower() in product.title.lower()]
        paginated_products = paginate_products(filtered_products, page, size)
        return { 'products': paginated_products, 'deleted_products': deleted_products, 'redo_products': redo_stack }
    
    paginated_products = paginate_products(list_products, page, size)
 
    return { 
            'products': paginated_products, 
            'deleted_products': deleted_products, 
            'redo_products': redo_stack, 
            'total_products': len(list_products) 
    }
    
@router.get("/products/sort_by_date", response_model=ProductsResponse)
def get_products_sorted_by_date(page: int = Query(1, ge=1), size: int = Query(9, ge=1)) -> ProductsResponse:
    sorted_products = sorted(
        list_products,
        key=lambda p: datetime.strptime(p.last_modified, '%Y-%m-%d') if p.last_modified else datetime.min,
        reverse=True
    )
    paginated_products = paginate_products(sorted_products, page, size)

    return { 
        'products': paginated_products, 
        'deleted_products': deleted_products, 
        'redo_products': redo_stack, 
        'total_products': len(list_products) 
    }
    
@router.get("/products/sort_by_rate", response_model=ProductsResponse)
def get_products_sorted_by_rate(page: int = Query(1, ge=1), size: int = Query(9, ge=1)) -> ProductsResponse:
    sorted_products = sorted(list_products, key=lambda p: p.average_rate, reverse=True)
    paginated_products = paginate_products(sorted_products, page, size)
    
    return { 
        'products': paginated_products, 
        'deleted_products': deleted_products, 
        'redo_products': redo_stack, 
        'total_products': len(list_products) 
    }

@router.get("/products/sort_by_name", response_model=ProductsResponse)
def get_products_sorted_by_name(page: int = Query(1, ge=1), size: int = Query(9, ge=1)) -> ProductsResponse:
    sorted_products = sorted(list_products, key=lambda p: p.title.lower())
    paginated_products = paginate_products(sorted_products, page, size)
    
    return { 
            'products': paginated_products, 
            'deleted_products': deleted_products, 
            'redo_products': redo_stack, 
            'total_products': len(list_products) 
    }

@router.get("/products/{product_id}", response_model=Product)
async def get_product(product_id: int = Path(..., ge=0)):
    return get_product_by_id(product_id)

@router.get("/deleted_products", response_model=List[Product])
async def get_deleted_products_list():
    return deleted_products

#   ---------------
#        POST
#   ---------------

@router.post("/restore_product", response_model=ProductsResponse)
async def restore_product_endpoint():
    restore_product()
     
    return { 
        'products': list_products, 
        'deleted_products': deleted_products, 
        'redo_products': redo_stack, 
        'total_products': len(list_products)  
    }

@router.post("/redo_product", response_model=ProductsResponse)
async def redo_product_endpoint():
    redo_product()
    
    return { 
        'products': list_products, 
        'deleted_products': deleted_products, 
        'redo_products': redo_stack, 
        'total_products': len(list_products)  
    }

#   ---------------
#         PUT
#   ---------------

@router.put("/products/{product_id}", response_model=Product)
async def update_product_endpoint(product: Product):
    return update_product(product)

#   ---------------
#       DELETE
#   ---------------

@router.delete("/delete_product/{product_id}", response_model=List[Product])
async def delete_product_by_id(product_id: int = Path(..., ge=0)):
    return delete_product(product_id)
