import json
from ragflow_sdk import RAGFlow

# Inicializa seu objeto RAGFlow
rag_object = RAGFlow(api_key="ragflow-JlNzI3ZTI2NTliYTExZjA4YmYzOWEzYz", base_url="http://localhost")

# Lista para armazenar os dados dos chats no formato que o JSON entende (dicionários)
chats_para_json = []

# Itera sobre os objetos Chat retornados pela SDK
for chat_objeto in rag_object.list_chats():
    # Converte o objeto 'Chat' para um dicionário
    chat_dict = {
        "id": chat_objeto.id,
        "name": chat_objeto.name,
        # CORREÇÃO: Usando 'create_date' como sugerido pelo erro
        "create_date": chat_objeto.create_date.isoformat() if hasattr(chat_objeto.create_date, 'isoformat') else str(chat_objeto.create_date),
        # Se você tiver um atributo 'status' ou outros, adicione-os aqui:
        # "status": chat_objeto.status,
        # Lembre-se de adicionar outros atributos conforme necessário e garantir que eles sejam serializáveis
    }
    
    # Adiciona o dicionário do chat à lista
    chats_para_json.append(chat_dict)

# Define o nome do arquivo JSON de saída
nome_arquivo_saida = "ragflow_chats.json"

# Escreve os dados no arquivo JSON
try:
    with open(nome_arquivo_saida, 'w', encoding='utf-8') as f:
        json.dump(chats_para_json, f, ensure_ascii=False, indent=4)
    print(f"Chats salvos com sucesso em {nome_arquivo_saida}")
except Exception as e:
    print(f"Ocorreu um erro ao salvar os chats: {e}")

# Cria uma sessão com o assistente "Uflianinho"
assistant = rag_object.list_chats(name="Uflianinho")
assistant = assistant[0]
session = assistant.create_session()    

print("\n==================== Uflianinho =====================\n")
print("Hello. What can I do for you?")

while True:
    question = input("\n==================== User =====================\n> ")
    print("\n==================== Miss R =====================\n")
    
    cont = ""
    for ans in session.ask(question, stream=False):
        print(ans.content[len(cont):], end='', flush=True)
        cont = ans.content