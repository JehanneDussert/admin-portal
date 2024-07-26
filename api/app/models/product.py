from pydantic import BaseModel
from typing import List

class Review(BaseModel):
    title: str
    desc: str
    rate: int
    
class Product(BaseModel):
    id: int
    title: str
    resume: str
    desc: str
    price: int
    reviews: List[Review]
