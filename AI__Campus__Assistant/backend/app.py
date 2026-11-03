from flask import Flask, request, jsonify
from flask_cors import CORS
import os
import time

from langchain_community.vectorstores import FAISS
from langchain_huggingface import HuggingFaceEmbeddings

from openai import OpenAI

from rag_engine import index_documents

app = Flask(__name__)
CORS(app)

# -----------------------------
# SETTINGS
# -----------------------------

UPLOAD_FOLDER = "documents"
VECTOR_DB_PATH = "vector_db"

os.makedirs(UPLOAD_FOLDER, exist_ok=True)

# 🔑 PASTE YOUR OPENAI API KEY HERE
client = OpenAI(api_key="")

# -----------------------------
# HOME
# -----------------------------

@app.route("/")
def home():
    return "MES MSPS AI Backend Running"

# -----------------------------
# LIST DOCUMENTS
# -----------------------------

@app.route("/files")
def files():

    try:

        files_list = []

        for file in os.listdir(UPLOAD_FOLDER):

            file_path = os.path.join(UPLOAD_FOLDER, file)

            size = os.path.getsize(file_path) / 1024
            upload_time = os.path.getctime(file_path)

            files_list.append({
                "name": file,
                "size": round(size,2),
                "date": time.ctime(upload_time)
            })

        return jsonify(files_list)

    except Exception as e:

        return jsonify({"error": str(e)})

# -----------------------------
# UPLOAD DOCUMENT
# -----------------------------

@app.route("/upload", methods=["POST"])
def upload():

    try:

        files = request.files.getlist("files")

        for file in files:

            file_path = os.path.join(UPLOAD_FOLDER, file.filename)

            file.save(file_path)

        # rebuild vector database
        index_documents(UPLOAD_FOLDER)

        return jsonify({"message": "Documents uploaded and indexed successfully"})

    except Exception as e:

        return jsonify({"error": str(e)})

# -----------------------------
# DELETE DOCUMENT
# -----------------------------

@app.route("/delete/<filename>", methods=["DELETE"])
def delete_file(filename):

    try:

        file_path = os.path.join(UPLOAD_FOLDER, filename)

        if os.path.exists(file_path):

            os.remove(file_path)

            # rebuild vector db
            index_documents(UPLOAD_FOLDER)

        return jsonify({"message": "File deleted successfully"})

    except Exception as e:

        return jsonify({"error": str(e)})

# -----------------------------
# CHATBOT (RAG)
# -----------------------------

@app.route("/chat", methods=["POST"])
def chat():

    try:

        data = request.json
        question = data.get("question")

        if not question:
            return jsonify({"answer": "Please ask a valid question."})

        embeddings = HuggingFaceEmbeddings(
            model_name="sentence-transformers/all-MiniLM-L6-v2"
        )

        db = FAISS.load_local(
            VECTOR_DB_PATH,
            embeddings,
            allow_dangerous_deserialization=True
        )

        docs = db.similarity_search(question, k=3)

        context = "\n\n".join([doc.page_content for doc in docs])

        prompt = f"""
You are an AI assistant for MES MSPS College.

Answer the student's question using the document context.

If the answer is not found, say:
"I could not find that information in the college documents."

Context:
{context}

Question:
{question}
"""

        response = client.chat.completions.create(

            model="gpt-4o-mini",

            messages=[
                {"role": "system", "content": "You are a helpful campus assistant."},
                {"role": "user", "content": prompt}
            ]

        )

        answer = response.choices[0].message.content

        return jsonify({"answer": answer})

    except Exception as e:

        return jsonify({"answer": f"Server error: {str(e)}"})

# -----------------------------
# RUN SERVER
# -----------------------------

if __name__ == "__main__":
    app.run(debug=True)