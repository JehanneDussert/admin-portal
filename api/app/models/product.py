from pydantic import BaseModel
from typing import List
from datetime import datetime

class Review(BaseModel):
    title: str
    desc: str
    rate: int
    date: str

class Product(BaseModel):
    id: int
    title: str
    resume: str
    desc: str
    price: int
    average_rate: float = 0.0
    reviews: List[Review]
    last_modified: str
    is_deleted: bool
    
    def calculate_average_rate(self) -> None:
        if self.reviews:
            total_rate = sum(review.rate for review in self.reviews)
            self.average_rate = total_rate / len(self.reviews)
        else:
            self.average_rate = 0.0

class ProductsResponse(BaseModel):
    products: List[Product]
    deleted_products: List[Product]
    redo_products: List[Product]
    total_products: int