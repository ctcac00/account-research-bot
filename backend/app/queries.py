from pymongo import MongoClient
import os
from dotenv import load_dotenv

load_dotenv()  # take environment variables from .env.

MONGO_URI = os.environ["MONGO_URI"]

# Note that if you change this, you also need to change it in `rag_mongo/chain.py`
DB_NAME = "account_research_bot"
COLLECTION_NAME = "data"
ATLAS_VECTOR_SEARCH_INDEX_NAME = "vector_index"
EMBEDDING_FIELD_NAME = "embedding"
client = MongoClient(MONGO_URI)
db = client[DB_NAME]

# Get disctinct accounts from MongoDB
def get_accounts():
  collection = db[COLLECTION_NAME]

  # Query distinct accounts
  distinct_accounts = collection.distinct("account")
  return distinct_accounts

# Get distinct files for an account from MongoDB
def get_files(account):
  collection = db[COLLECTION_NAME]

  # Query distinct files for an account
  distinct_files = collection.distinct("source", {"account": account})

  # extract filenames from URL like https://www.example.com/file.pdf
  distinct_files = [file.split("/")[-1] for file in distinct_files]  

  return distinct_files

if __name__ == "__main__":
    # Load docs
    accounts = get_accounts()
    print(accounts)