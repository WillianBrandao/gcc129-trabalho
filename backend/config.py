from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI
import os

# Instância do FastAPI
app = FastAPI(title="Servico‑Uflianinho")

# CORS
origens_permitidas = [
    "http://localhost",
    "http://localhost:5500",
    "http://127.0.0.1:5500",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origens_permitidas,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configurações RAGFlow
CHAVE_API_RAG = os.getenv("CHAVE_API_RAG", "ragflow-JlNzI3ZTI2NTliYTExZjA4YmYzOWEzYz")
URL_BASE_RAG = os.getenv("URL_BASE_RAG", "http://localhost")
NOME_ASSISTENTE = "Uflinho"
