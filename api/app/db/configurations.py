from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi

uri = "mongodb+srv://jehannedussert:lr7ITHl92YrEcoPV@cluster0.re0osub.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

client = MongoClient(uri, server_api=ServerApi("1"))

db = client.products_db
collection = db["products"]
