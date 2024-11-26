# UberEatsBackend/mongo_sessions.py

import bson
from django.conf import settings
from django.contrib.sessions.backends.base import SessionBase, CreateError
from pymongo import MongoClient
from django.utils import timezone
import datetime

# Connect to MongoDB
client = MongoClient(settings.MONGO_URI)
db = client.get_database()
collection = db.sessions  # Use the 'sessions' collection

class MongoSession(SessionBase):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.session_id = self._get_session_key()

    def _get_session_key(self):
        """ Get or generate the session key """
        if not self.session_key:
            self.session_key = bson.ObjectId()  # Generate a new ObjectId if not available
        return str(self.session_key)

    def load(self):
        """ Load the session data from MongoDB """
        if self.session_key:
            session_data = collection.find_one({"_id": self.session_key})
            if session_data:
                self._session_cache = session_data.get("data", {})
                self._session_key = session_data["_id"]
            else:
                self._session_cache = {}

    def create(self):
        """ Create a new session """
        self._session_key = bson.ObjectId()  # Generate a new ObjectId
        self._session_cache = {}
        self.save()

    def delete(self):
        """ Delete the session data from MongoDB """
        if self.session_key:
            collection.delete_one({"_id": self.session_key})

    def save(self):
        """ Save session data to MongoDB """
        session_data = {
            "_id": self.session_key,
            "data": self._session_cache,
            "expire_at": timezone.now() + datetime.timedelta(seconds=settings.SESSION_COOKIE_AGE)
        }
        collection.replace_one({"_id": self.session_key}, session_data, upsert=True)
