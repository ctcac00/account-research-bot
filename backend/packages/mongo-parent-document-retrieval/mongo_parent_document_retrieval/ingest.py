import os
import uuid
from io import BytesIO

from langchain_community.document_loaders import PyPDFLoader
from langchain_community.embeddings import OpenAIEmbeddings
from langchain_community.vectorstores import MongoDBAtlasVectorSearch
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain.docstore.document import Document
from pymongo import MongoClient
from PyPDF2 import PdfReader
from dotenv import load_dotenv

load_dotenv()  # take environment variables from .env.

PARENT_DOC_ID_KEY = "parent_doc_id"

def green(text: str) -> str:
    """Return the given text in green."""
    return "\x1b[32;40m" + text + "\x1b[0m"

def orange(text: str) -> str:
    """Return the given text in orange."""
    return "\x1b[31;40m" + text + "\x1b[0m"

def load_pdf(url, account):
    # Load docs
    print(f'{green("INFO:")} Loading PDF from:', url)
    loader = PyPDFLoader(url)
    data = loader.load()

    # Split docs
    print(f'{green("INFO:")} Splitting documents...')
    parent_docs, child_docs = parent_child_splitter(data, account)

    print(f'{green("INFO:")} Inserting documents into MongoDB Atlas Vector Search...')
    # Insert the documents in MongoDB Atlas Vector Search
    _ = MongoDBAtlasVectorSearch.from_documents(
        documents=parent_docs + child_docs,
        embedding=OpenAIEmbeddings(disallowed_special=()),
        collection=MONGODB_COLLECTION,
        index_name=ATLAS_VECTOR_SEARCH_INDEX_NAME,
    )
    print(f'{green("INFO:")} Done!')

def load_pdf_file(content, account):
    # Load docs
    print(f'{green("INFO:")} Loading PDF from file...')

    data = []
    reader = PdfReader(content)
    i = 1
    for page in reader.pages:
        data.append(Document(page_content=page.extract_text(), metadata={'page':i}))
        i += 1

    #loader = PyPDFLoader(content)
    #data = loader.load()

    # Split docs
    print(f'{green("INFO:")} Splitting documents...')
    parent_docs, child_docs = parent_child_splitter(data, account)

    print(f'{green("INFO:")} Inserting documents into MongoDB Atlas Vector Search...')
    # Insert the documents in MongoDB Atlas Vector Search
    _ = MongoDBAtlasVectorSearch.from_documents(
        documents=parent_docs + child_docs,
        embedding=OpenAIEmbeddings(disallowed_special=()),
        collection=MONGODB_COLLECTION,
        index_name=ATLAS_VECTOR_SEARCH_INDEX_NAME,
    )
    print(f'{green("INFO:")} Done!')

def parent_child_splitter(data, account, id_key=PARENT_DOC_ID_KEY):
    parent_splitter = RecursiveCharacterTextSplitter(chunk_size=2000)
    # This text splitter is used to create the child documents
    # It should create documents smaller than the parent
    child_splitter = RecursiveCharacterTextSplitter(chunk_size=400)
    documents = parent_splitter.split_documents(data)
    doc_ids = [str(uuid.uuid4()) for _ in documents]

    docs = []
    for i, doc in enumerate(documents):
        _id = doc_ids[i]
        sub_docs = child_splitter.split_documents([doc])
        for _doc in sub_docs:
            _doc.metadata[id_key] = _id
            _doc.metadata["doc_level"] = "child"
        docs.extend(sub_docs)
        doc.metadata[id_key] = _id
        doc.metadata["doc_level"] = "parent"
        doc.metadata["account"] = account
    return documents, docs


MONGO_URI = os.environ["MONGO_URI"]

# Note that if you change this, you also need to change it in `rag_mongo/chain.py`
DB_NAME = "langchain-test-2"
COLLECTION_NAME = "test"
ATLAS_VECTOR_SEARCH_INDEX_NAME = "default"
EMBEDDING_FIELD_NAME = "embedding"
client = MongoClient(MONGO_URI)
db = client[DB_NAME]
MONGODB_COLLECTION = db[COLLECTION_NAME]

if __name__ == "__main__":
    # Load docs
    load_pdf("https://icseindia.org/document/sample.pdf", "india")
    # Load docs from file
    with open("/Users/carloscastro/Downloads/sample.pdf", "rb") as fh:
        bytes_stream = BytesIO(fh.read())
        load_pdf_file(bytes_stream, "icse")