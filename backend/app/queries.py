from pymongo import MongoClient
import os
from dotenv import load_dotenv

load_dotenv()  # take environment variables from .env.

MONGO_URI = os.environ["MONGO_URI"]

# Note that if you change this, you also need to change it in `rag_mongo/chain.py`
DB_NAME = "langchain-test-2"
COLLECTION_NAME = "test"
ATLAS_VECTOR_SEARCH_INDEX_NAME = "default"
EMBEDDING_FIELD_NAME = "embedding"
client = MongoClient(MONGO_URI)
db = client[DB_NAME]

def get_accounts():
  collection = db[COLLECTION_NAME]

  # Query distinct accounts
  distinct_accounts = collection.distinct("account")

  # Close the MongoDB connection
  client.close()

  return distinct_accounts


if __name__ == "__main__":
    # Load docs
    accounts = get_accounts()
    print(accounts)