import os

from langchain_community.document_loaders import PyPDFLoader
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_huggingface import HuggingFaceEmbeddings
from langchain_community.vectorstores import FAISS


VECTOR_DB_PATH = "vector_db"


def index_documents(folder):

    docs = []

    # Load all PDFs
    for file in os.listdir(folder):

        if file.endswith(".pdf"):

            path = os.path.join(folder, file)

            loader = PyPDFLoader(path)

            docs.extend(loader.load())


    # Split documents into chunks
    splitter = RecursiveCharacterTextSplitter(

        chunk_size=500,
        chunk_overlap=50

    )

    chunks = splitter.split_documents(docs)


    # Create embeddings
    embeddings = HuggingFaceEmbeddings(

        model_name="sentence-transformers/all-MiniLM-L6-v2"

    )


    # Create FAISS vector DB
    db = FAISS.from_documents(chunks, embeddings)

    db.save_local(VECTOR_DB_PATH)


    print("Vector database rebuilt successfully.")