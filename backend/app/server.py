from io import BytesIO
from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI, UploadFile
from fastapi.responses import RedirectResponse
from langserve import add_routes
from mongo_parent_document_retrieval import chain as mongo_parent_document_retrieval_chain
from mongo_parent_document_retrieval import load_pdf, load_pdf_file, ask_bot
from app import get_accounts, get_files
from dotenv import load_dotenv

load_dotenv()  # take environment variables from .env.

app = FastAPI()

origins = [
    "http://localhost",
    "http://localhost:8080",
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def redirect_root_to_docs():
    return RedirectResponse("/docs")

@app.get("/ask-bot")
async def ask_bot_api(query: str, account: str = "default"):
    result = ask_bot(query, account)
    return {"result": result}

@app.get("/load-pdf")
async def load_pdf_api(url: str, account: str = "default"):
    load_pdf(url, account)
    return {"message": "PDF loaded"}

@app.post("/upload-pdf")
async def upload_pdf_api(file: UploadFile, account: str = "default"):
    content = await file.read()
    bytes_stream = BytesIO(content)
    load_pdf_file(bytes_stream, file.filename, account)
    return {"message": "PDF uploaded"}

@app.get("/accounts")
async def get_accounts_api():
    accounts = get_accounts()
    return accounts

@app.get("/files")
async def get_files_api(account: str = "default"):
    files = get_files(account)
    return files

add_routes(app, mongo_parent_document_retrieval_chain, path="/mongo-parent-document-retrieval")

if __name__ == "__main__":
    import uvicorn

    uvicorn.run(app, host="0.0.0.0", port=8080)
