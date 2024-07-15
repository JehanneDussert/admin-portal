from fastapi import FastAPI, HTTPException, Path, Query
from typing import List
from fastapi.middleware.cors import CORSMiddleware
from app.models.product import Product

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
    Product(title="Tomate", desc="Une description"),
    Product(title="Patate", desc="Une description"),
    Product(title="Salade", desc="Une description"),
    Product(title="Avocat", desc="Une description"),
    Product(title="Asperge", desc="Une description"),
    Product(title="Potimaron", desc="Une description"),
]

@app.get("/")
async def root():
    return {"message": "Hello World"}

@app.get("/api/products", response_model=List[Product])
async def get_products() -> List[Product]:
    return list_products

@app.get("/api/products/{product_id}", response_model=Product)
async def get_products_by_id(product_id: int = Path(..., ge=0)) -> Product:
    if product_id >= len(list_products):
        raise HTTPException(status_code=404, detail="Product not found")
    
    return list_products[product_id]

@app.get("/api/products_by_name", response_model=List[Product])
async def get_products(product_name: str = Query(None)):
    if product_name:
        filtered_products = [
            product for product in list_products 
            if product_name.lower() in product.title.lower()
        ]
        return filtered_products
    
    return list_products
