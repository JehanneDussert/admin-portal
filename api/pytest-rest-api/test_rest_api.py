import os
import sys
from datetime import datetime

import pytest
from fastapi.testclient import TestClient

from app.main import app

sys.path.insert(
    0,
    os.path.abspath(os.path.join(os.path.dirname(__file__), "..")),
)

client = TestClient(app)


# GET all products
def test_get_products():
    response = client.get("/api/products")

    assert response.status_code == 200
    assert isinstance(response.json(), dict)


# GET product by name
def test_get_products_by_name():
    response = client.get("/api/products_by_name?product_name=N")

    assert response.status_code == 200
    assert response.json()["products"][0]["title"] == "Produit N"


# GET products sorted by date
def test_get_products_sorted_by_date():
    response = client.get("/api/products/sort_by_date")

    assert response.status_code == 200

    products = response.json()["products"]
    try:
        dates = [
            datetime.strptime(
                product["last_modified"],
                "%Y-%m-%d",
            )
            for product in products
        ]
    except ValueError:
        pytest.fail("Format de date invalide dans la réponse")

    assert all(
        earlier >= later for earlier, later in zip(dates, dates[1:])
    )


# GET products sorted by rate
def test_get_products_sorted_by_rate():
    response = client.get("/api/products/sort_by_rate")
    assert response.status_code == 200

    products = response.json()["products"]
    rates = [product["average_rate"] for product in products]

    assert all(
        rates[index] >= rates[index + 1] for index in range(len(rates) - 1)
    )


# GET products sorted by name
def test_get_products_sorted_by_name():
    response = client.get("/api/products/sort_by_name")
    assert response.status_code == 200

    products = response.json()["products"]
    sorted_list = [product["title"].lower() for product in products]

    assert all(
        sorted_list[index] <= sorted_list[index + 1]
        for index in range(len(sorted_list) - 1)
    )


# GET product sorted by id
def test_get_product_by_id():
    response = client.get("/api/products/0")

    assert response.status_code == 200
    assert response.json()["title"] == "Produit A"


# DELETE product & check deleted_products list
def test_delete_product():
    response = client.delete("/api/delete_product/0")

    assert response.status_code == 200
    assert len(response.json()) == 19

    response = client.delete("/api/deleted_products")

    assert len(response.json()) == 1


# RESTORE product & check deleted_products list
def test_restore_product():
    client.delete("/api/delete_product/1")
    response = client.post("/api/restore_product")

    assert response.status_code == 200
    assert len(response.json()["products"]) == 19
    assert len(response.json()["redo_products"]) == 1

    response = client.delete("/api/deleted_products")

    assert len(response.json()) == 1


# PUT product & check update
def test_update_product():
    response = client.put(
        "/api/products/0",
        json={
            "id": 0,
            "title": "Produit A modifié",
            "resume": "Un nouveau résumé",
            "desc": "Une nouvelle description",
            "price": 12,
            "average_rate": 4.5,
            "reviews": [],
            "last_modified": "2024-12-12",
            "is_deleted": False,
        },
    )

    assert response.status_code == 200
    assert response.json()["title"] == "Produit A modifié"
