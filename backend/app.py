from backend.config.config import app, CHAVE_API_RAG, URL_BASE_RAG, NOME_ASSISTENTE
from fastapi import HTTPException
from pydantic import BaseModel
from ragflow_sdk import RAGFlow
import uuid
import threading
import logging
from fastapi.staticfiles import StaticFiles
from fastapi.responses import HTMLResponse
from fastapi import Request
import os


# Configuração do logger
logger = logging.getLogger("uvicorn.error")

# Configuração do FastAPI para o frontend
app.mount("/styles", StaticFiles(directory="frontend/styles"), name="styles")
app.mount("/scripts", StaticFiles(directory="frontend/scripts"), name="scripts")

# Inicialização do RAGFlow e assistente
rag_lock = threading.Lock()
rag = None
assistente = None
sessoes: dict[str, any] = {}

# Função que instancia a conexão com o Ragflow
def get_assistente():
    global rag, assistente
    with rag_lock:
        if assistente is None:
            logger.info("🔌 Conectando ao RAGFlow...")
            rag = RAGFlow(api_key=CHAVE_API_RAG, base_url=URL_BASE_RAG)
            lista = rag.list_chats(name=NOME_ASSISTENTE)
            if not lista:
                raise RuntimeError(f"Assistente '{NOME_ASSISTENTE}' não encontrado.")
            assistente = lista[0]
            logger.info("✅ Assistente conectado.")
        return assistente

# ---------- MODELOS ----------
class PerguntaEntrada(BaseModel):
    pergunta: str
    id_sessao: str | None = None

class RespostaSaida(BaseModel):
    resposta: str
    id_sessao: str

# ---------- ROTAS --------------

# Rota para perguntar ao assistente
@app.post("/perguntar", response_model=RespostaSaida)
async def perguntar(dados: PerguntaEntrada):
    logger.info(f"👤 Pergunta recebida: {dados.pergunta!r}")
    id_sessao = dados.id_sessao or str(uuid.uuid4())

    # Cria a sessão só se ela ainda não existir
    if id_sessao not in sessoes:
        logger.info(f"🆕 Criando nova sessão: {id_sessao}")
        sessoes[id_sessao] = get_assistente().create_session(dados.pergunta)

    try:
        resposta = ""
        logger.info(f"🆕 Gerando resposta...")
        for parte in sessoes[id_sessao].ask(dados.pergunta, stream=False):
            texto_novo = parte.content[len(resposta):]
            resposta += texto_novo
            logger.debug(f"📩 Chunk: {texto_novo!r}")

        logger.info(f"🤖 Resposta gerada: {resposta!r}")
        return RespostaSaida(resposta=resposta, id_sessao=id_sessao)

    except Exception as erro:
        logger.exception("❌ Erro ao obter resposta:")
        raise HTTPException(status_code=500, detail=str(erro))
    

# ---------- FRONTEND --------------
# Retorna o HTML do frontend
@app.get("/", response_class=HTMLResponse)
async def serve_frontend(request: Request):
    with open(os.path.join("frontend", "index.html"), encoding="utf-8") as f:
        return HTMLResponse(content=f.read(), status_code=200)
