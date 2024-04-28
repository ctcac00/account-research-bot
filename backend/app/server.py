from fastapi import FastAPI
from fastapi.responses import RedirectResponse
from langserve import add_routes
from mongo_parent_document_retrieval import chain as mongo_parent_document_retrieval_chain
from mongo_parent_document_retrieval import load_pdf, ask_bot
from app import get_accounts
from dotenv import load_dotenv

load_dotenv()  # take environment variables from .env.

app = FastAPI()

@app.get("/")
async def redirect_root_to_docs():
    return RedirectResponse("/docs")

@app.get("/ask-bot")
async def ask_bot_api(query: str):
    result = ask_bot(query)
    return {"result": result}

@app.get("/load-pdf")
async def load_pdf_api(url: str, account: str = "default"):
    load_pdf(url, account)
    return {"message": "PDF loaded"}

@app.get("/accounts")
async def get_accounts_api():
    accounts = get_accounts()
    return accounts

add_routes(app, mongo_parent_document_retrieval_chain, path="/mongo-parent-document-retrieval")

if __name__ == "__main__":
    import uvicorn

    uvicorn.run(app, host="0.0.0.0", port=8000)
