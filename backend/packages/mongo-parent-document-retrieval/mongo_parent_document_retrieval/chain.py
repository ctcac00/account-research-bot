import os

from langchain_community.chat_models import AzureChatOpenAI
from langchain_community.embeddings import AzureOpenAIEmbeddings
from langchain_community.vectorstores import MongoDBAtlasVectorSearch
from langchain_core.documents import Document
from langchain_core.output_parsers import StrOutputParser
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.pydantic_v1 import BaseModel
from langchain_core.runnables import RunnableParallel, RunnablePassthrough
from pymongo import MongoClient
from dotenv import load_dotenv

load_dotenv()  # take environment variables from .env.

MONGO_URI = os.environ["MONGO_URI"]
PARENT_DOC_ID_KEY = "parent_doc_id"
# Note that if you change this, you also need to change it in `rag_mongo/chain.py`
DB_NAME = "account_research_bot"
COLLECTION_NAME = "data"
ATLAS_VECTOR_SEARCH_INDEX_NAME = "vector_index"
EMBEDDING_FIELD_NAME = "embedding"
client = MongoClient(MONGO_URI)
db = client[DB_NAME]
MONGODB_COLLECTION = db[COLLECTION_NAME]

accountFilter = "default"

vector_search = MongoDBAtlasVectorSearch.from_connection_string(
    MONGO_URI,
    DB_NAME + "." + COLLECTION_NAME,
    AzureOpenAIEmbeddings(
        azure_deployment=os.environ["AZURE_OPENAI_DEPLOYMENT"],
        openai_api_version="2023-05-15",
        ),
    index_name=ATLAS_VECTOR_SEARCH_INDEX_NAME,
)

def retrieve(query: str):
    print(f'{green("INFO:")} Account is {accountFilter} ')

    if (accountFilter != "default"):
        filter ={
            "$and": [
                {
                    "doc_level": "child"
                },
                {
                     "account": accountFilter
                }
            ]
        }
    else:
        filter = {"doc_level": "child"}

    print(f'{green("INFO:")} Filter: {filter}')

    results = vector_search.similarity_search(
        query,
        k=4,
        pre_filter=filter,
        post_filter_pipeline=[
            {"$project": {"embedding": 0}},
            {
                "$lookup": {
                    "from": COLLECTION_NAME,
                    "localField": PARENT_DOC_ID_KEY,
                    "foreignField": PARENT_DOC_ID_KEY,
                    "as": "parent_context",
                    "pipeline": [
                        {"$match": {"doc_level": "parent"}},
                        {"$limit": 1},
                        {"$project": {"embedding": 0}},
                    ],
                }
            },
        ],
    )
    parent_docs = []
    parent_doc_ids = set()
    for result in results:
        res = result.metadata["parent_context"][0]
        text = res.pop("text")
        # This causes serialization issues.
        res.pop("_id")
        parent_doc = Document(page_content=text, metadata=res)
        if parent_doc.metadata[PARENT_DOC_ID_KEY] not in parent_doc_ids:
            parent_doc_ids.add(parent_doc.metadata[PARENT_DOC_ID_KEY])
            parent_docs.append(parent_doc)
    return parent_docs


# RAG prompt
template = """Answer the question based only on the following context:
{context}
Question: {question}
"""
prompt = ChatPromptTemplate.from_template(template)

# RAG
model = AzureChatOpenAI(
    openai_api_version=os.environ["AZURE_OPENAI_API_VERSION"],
    azure_deployment=os.environ["AZURE_OPENAI_CHAT_DEPLOYMENT_NAME"],
)
chain = (
    RunnableParallel({"context": retrieve, "question": RunnablePassthrough()})
    | prompt
    | model
    | StrOutputParser()
)


# Add typing for input
class Question(BaseModel):
    __root__: str


chain = chain.with_types(input_type=Question)

def green(text: str) -> str:
    """Return the given text in green."""
    return "\x1b[32;40m" + text + "\x1b[0m"

def orange(text: str) -> str:
    """Return the given text in orange."""
    return "\x1b[31;40m" + text + "\x1b[0m"

def ask_bot(question: str, account: str = "default"):
    print(f'{green("INFO:")} Asking bot: {question} on account {account}')
    if (account != ""):
        global accountFilter
        accountFilter = account
        
    response = chain.invoke(question)
    print(f'{green("INFO:")} Response:', response)
    return response

if __name__ == "__main__":
    response = chain.invoke("What is MongoDB Atlas Vector Search?")
    print(response)