from django.core.management.base import BaseCommand
from pymongo import MongoClient

class Command(BaseCommand):
    help = "Seed users into MongoDB"

    def handle(self, *args, **kwargs):
        client = MongoClient("mongodb://localhost:27017/")
        db = client["uber_eats_db"]
        users_collection = db["users"]

        # Insert example data
        users_collection.insert_one({
            "name": "John Doe",
            "email": "john.doe@example.com",
            "password": "securepassword"
        })
        self.stdout.write(self.style.SUCCESS("Successfully added user!"))