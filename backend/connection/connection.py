
from pymongo.mongo_client import MongoClient
from urllib.parse import quote_plus
import certifi 
ca = certifi.where()
password = quote_plus('123')
uri = "mongodb+srv://temp:"+password+"@cluster0.rpns8fe.mongodb.net/?retryWrites=true&w=majority"
client = MongoClient(uri,tlsCAFile=ca)

try:
    client.admin.command('ping')
    print("Pinged your deployment. You successfully connected to MongoDB!")
except Exception as e:
    print(e)