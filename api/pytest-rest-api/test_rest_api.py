
import sys
import os
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

def test_get_products():
    response = client.get("/api/products")
    assert response.status_code == 200
    assert isinstance(response.json(), list)

def test_get_product_by_id():
    response = client.get("/api/products/0")
    assert response.status_code == 200
    assert response.json()["title"] == "Tomate"

def test_delete_product():
    response = client.delete("/api/delete_product?product_id=0")
    assert response.status_code == 200
    assert len(response.json()) == 5

def test_restore_product():
    client.delete("/api/delete_product?product_id=1")
    response = client.post("/api/restore_product")
    assert response.status_code == 200
    assert len(response.json()) == 5

def test_update_product():
    response = client.put("/api/products/0", json={"title": "Tomate modifiée", "desc": "Une nouvelle description", "id": 0})
    assert response.status_code == 200
    assert response.json()["title"] == "Tomate modifiée"
