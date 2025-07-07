from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI
from dotenv import load_dotenv
from pathlib import Path
import os

# Instância do FastAPI
app = FastAPI(title="Servico‑Uflinho")

# Carrega as variáveis de ambiente do arquivo .env
load_dotenv(dotenv_path=Path(__file__).resolve().parents[2] / ".env")

# CORS
origens_permitidas = os.getenv("ALLOWED_ORIGINS").split(",")

app.add_middleware(
    CORSMiddleware,
    allow_origins=origens_permitidas,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configurações RAGFlow
CHAVE_API_RAG = os.getenv("CHAVE_API_RAG")
URL_BASE_RAG = os.getenv("URL_BASE_RAG")
NOME_ASSISTENTE = "Uflinho"
