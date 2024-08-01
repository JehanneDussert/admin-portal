from app.models.product import Review


def individual_data(product):
    return {
        "id": int(product["id"]),
        "title": str(product["title"]),
        "resume": str(product["resume"]),
        "desc": str(product["desc"]),
        "price": int(product["price"]),
        "reviews": list[Review](product["reviews"]),
        "last_modified": str(product["last_modified"]),
        "is_deleted": bool(product["is_deleted"]),
    }


def all_products(products):
    return [individual_data(product) for product in products]
