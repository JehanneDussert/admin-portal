from fastapi import FastAPI
from typing import List
from fastapi.middleware.cors import CORSMiddleware

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
    "Produit 1", 
    "Produit 2", 
    "Produit 3", 
    "Produit 4", 
    "Produit 5", 
    "Produit 6"
]

@app.get("/")
async def root():
    return {"message": "Hello World"}

@app.get("/api/products")
async def get_products() -> List[str]:
    return list_products