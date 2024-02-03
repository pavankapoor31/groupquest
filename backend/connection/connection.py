
from datetime import datetime
from pymongo.mongo_client import MongoClient
from urllib.parse import quote_plus
import pymongo
import certifi 
ca = certifi.where()
password = quote_plus('123')
uri = "mongodb+srv://temp:"+password+"@cluster0.rpns8fe.mongodb.net/?retryWrites=true&w=majority"
client = MongoClient(uri,tlsCAFile=ca)

try:
    client.admin.command('ping')
    print("Pinged your deployment. You successfully connected to MongoDB!")
    # Connect to the database
    database = client["groupquest"]

    # Define collections
    profiles_collection = database["profiles"]
    groups_collection = database["groups"]
    events_collection = database["events"]
    discussions_collection = database["discussions"]
    resources_collection = database["resources"]

    # Add indexes to improve query performance
    profiles_collection.create_index([("profilename", pymongo.ASCENDING)], unique=True)
    groups_collection.create_index([("name", pymongo.ASCENDING)], unique=True)
    events_collection.create_index([("title", pymongo.ASCENDING)], unique=True)

    # Add keys to collections
    # Note: This is a basic example, you might want to customize this based on your application's requirements
    profile_data = {
        "profilename": "John Doe",
        "email": "profile@example.com",
        "password": "examplePassword",
        "created_at": datetime.now(),
        # Other profile-related fields
    }
    profile_id = profiles_collection.insert_one(profile_data).inserted_id

    group_data = {
        "name": "Study Group 1",
        "description": "Group for studying together",
        "created_by": profile_id,
        "members": [profile_id],
        "created_at": datetime.now(),
        # Other group-related fields
    }
    group_id = groups_collection.insert_one(group_data).inserted_id

    event_data = {
        "title": "Study Session",
        "description": "Group study session",
        "group_id": group_id,
        "date": datetime.now(),
        "location": "Library",
        "created_by": profile_id,
        # Other event-related fields
    }
    event_id = events_collection.insert_one(event_data).inserted_id

    discussion_data = {
        "group_id": group_id,
        "profile_id": profile_id,
        "message": "Let's discuss the upcoming study session",
        "timestamp": datetime.now(),
        # Other discussion-related fields
    }
    discussions_collection.insert_one(discussion_data)

    resource_data = {
        "group_id": group_id,
        "uploaded_by": profile_id,
        "title": "Study Material",
        "description": "Important notes for the study session",
        "file_url": "https://example.com/study_material.pdf",
        "timestamp": datetime.now(),
        # Other resource-related fields
    }
    resources_collection.insert_one(resource_data)

    # Close the MongoDB connection
    client.close()
except Exception as e:
    print(e)