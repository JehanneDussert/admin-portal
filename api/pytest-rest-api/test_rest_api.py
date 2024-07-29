import sys
import os
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

def test_get_products():
    response = client.get("/api/products")
    assert response.status_code == 200
    assert isinstance(response.json(), dict)

def test_get_product_by_id():
    response = client.get("/api/products/0")
    assert response.status_code == 200
    assert response.json()["title"] == "Produit A"

def test_delete_product():
    response = client.delete("/api/delete_product/0")
    assert response.status_code == 200
    assert len(response.json()) == 19
    response = client.delete("/api/deleted_products")
    assert len(response.json()) == 1

def test_restore_product():
    client.delete("/api/delete_product/1")
    response = client.post("/api/restore_product")
    assert response.status_code == 200
    assert len(response.json()['products']) == 19
    assert len(response.json()['redo_products']) == 1
    response = client.delete("/api/deleted_products")
    assert len(response.json()) == 1

def test_update_product():
    response = client.put("/api/products/0", json={
        "id": 0,
        "title": "Produit A modifié", 
        "resume": "Un nouveau résumé",
        "desc": "Une nouvelle description",
        "price": 12,
        "average_rate": 4.5,
        "reviews": [],
        "last_modified": "2024-12-12",
        "is_deleted": False
    })
    assert response.status_code == 200
    assert response.json()["title"] == "Produit A modifié"
