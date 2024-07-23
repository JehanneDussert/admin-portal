from fastapi import FastAPI, HTTPException, Path, Query
from typing import List, Optional
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

class Product(BaseModel):
    title: str
    desc: str
    id: int

app = FastAPI()

origins = [
    "http://localhost",
    "http://localhost:8080",
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

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

@app.get("/")
async def root():
    return {"message": "Hello World"}

@app.get("/api/products", response_model=List[Product])
async def get_products() -> List[Product]:
    return list_products

@app.get("/api/deleted_products", response_model=List[Product])
async def get_deleted_products() -> List[Product]:
    return deleted_products

@app.get("/api/redo_products", response_model=List[Product])
async def get_redo_products() -> List[Product]:
    return redo_stack

@app.get("/api/products/{product_id}", response_model=Product)
async def get_products_by_id(product_id: int = Path(..., ge=0)) -> Product:
    if product_id >= len(list_products):
        raise HTTPException(status_code=404, detail="Product not found")
    
    return list_products[product_id]

@app.get("/api/products_by_name", response_model=List[Product])
async def get_products_by_name(product_name: str = Query(None)) -> List[Product]:
    if product_name:
        filtered_products = [
            product for product in list_products 
            if product_name.lower() in product.title.lower()
        ]
        return filtered_products
    
    return list_products

@app.delete("/api/delete_product", response_model=List[Product])
async def delete_product(product_id: int) -> List[Product]:

    if product_id >= len(list_products):
        raise HTTPException(status_code=404, detail="Product not found")
    
    product_to_delete = list_products.pop(product_id)
    deleted_products.append(product_to_delete)

    for index, product in enumerate(list_products):
        product.id = index

    return list_products

@app.post("/api/restore_product", response_model=List[Product])
async def restore_product() -> List[Product]:

    if not deleted_products:
        raise HTTPException(status_code=404, detail="No product to restore")
    
    product_to_restore = deleted_products.pop()
    redo_stack.append(product_to_restore)
    product_to_restore.id = len(list_products)
    list_products.append(product_to_restore)

    for index, product in enumerate(list_products):
        product.id = index
    
    return list_products

@app.post("/api/redo_product", response_model=List[Product])
async def redo_product() -> List[Product]:

    if not redo_stack:
        raise HTTPException(status_code=404, detail="No product to redo")

    product_to_redo = redo_stack.pop()

    if product_to_redo in list_products:
        list_products.remove(product_to_redo)

    deleted_products.append(product_to_redo)

    for index, product in enumerate(list_products):
        product.id = index

    return list_products

@app.put("/api/products/{product_id}", response_model=Product)
async def update_product(product: Product) -> Product:
    if product.id >= len(list_products):
        raise HTTPException(status_code=404, detail="Product not found")
    
    list_products[product.id] = product

    return product