# SISTEMA DE ACESSOS A INFORMAÇÃO UFLA

## CONTEXTO E RELEVÂNCIA

Os discentes da Universidade Federal de Lavras (UFLA) frequentemente enfrentam dificuldades para encontrar informações acadêmicas essenciais dispersas em múltiplas plataformas institucionais. Entre as principais dores identificadas:

- Falta de centralização: Dados como número de faltas, solicitação de trancamento geral, histórico acadêmico e requisitos de disciplinas estão espalhados em diferentes sistemas

- Complexidade de navegação: Plataformas como SIGA, Moodle e sistemas departamentais possuem interfaces distintas e não integradas

- Demanda por autoatendimento: Observa-se que diversas dúvidas são frequentes e reflete as mesma dúvidas de diversos discentes.

## SOLUÇÃO

Com base na constatação dessa demanda, nosso grupo se propos a desenvolver um sistema chatbot, no qual o usuário poderia expor qual sua dúvida e ele automaticamente iria informar como solucionar o problema

## TECNOLOGIAS UTILIZADAS

<table border="1" style="border-collapse: collapse; width: 100%;">
  <!-- Front-end -->
  <tr>
    <td style="padding: 8px; text-align: center;">
      <img alt="HTML" height="30" width="30" src="https://raw.githubusercontent.com/devicons/devicon/master/icons/html5/html5-original.svg" />
      <img alt="CSS" height="30" width="30" src="https://raw.githubusercontent.com/devicons/devicon/master/icons/css3/css3-original.svg" />
      <img alt="JavaScript" height="30" width="30" src="https://raw.githubusercontent.com/devicons/devicon/master/icons/javascript/javascript-original.svg" />
    </td>
    <td style="padding: 8px;">HTML5, CSS3 & JavaScript</td>
    <td style="padding: 8px;">Front-End</td>
  </tr>

  <!-- Back-end -->
  <tr>
    <td style="padding: 8px; text-align: center;">
      <img alt="Python" height="30" width="30" src="https://raw.githubusercontent.com/devicons/devicon/master/icons/python/python-original.svg" />
    </td>
    <td style="padding: 8px;">Python 3.13</td>
    <td style="padding: 8px;">Back-End</td>
  </tr>

  <!-- FastAPI -->
  <tr>
    <td style="padding: 8px; text-align: center;">
      <img alt="FastAPI" height="30" width="30" src="https://fastapi.tiangolo.com/img/icon-white.svg" />
    </td>
    <td style="padding: 8px;">FastAPI</td>
    <td style="padding: 8px;">API REST</td>
  </tr>

  <!-- Uvicorn -->
  <tr>
    <td style="padding: 8px; text-align: center;">
      <img alt="Uvicorn" height="30" width="30" src="https://avatars.githubusercontent.com/u/51670903?s=200&v=4" />
    </td>
    <td style="padding: 8px;">Uvicorn</td>
    <td style="padding: 8px;">ASGI Server</td>
  </tr>

  <!-- RAGFlow SDK -->
  <tr>
    <td style="padding: 8px; text-align: center;">
      <img alt="Ragflow" height="90" width="90" src="https://www.marktechpost.com/wp-content/uploads/2024/04/Screenshot-2024-04-06-at-12.23.11-AM.png" />
    </td>
    <td style="padding: 8px;">RAGFlow SDK</td>
    <td style="padding: 8px;">Integração com Assistente IA</td>
  </tr>

  <!-- Ollama -->
<tr>
  <td style="padding: 8px; text-align: center;">
    <img alt="Ollama" height="60" width="60" src="https://img.utdstc.com/icon/6f9/ee0/6f9ee044146aecfd841c98f2a270d996b3e33440142456b9b4349c8bc681857c:200" />
  </td>
  <td style="padding: 8px;">Ollama</td>
  <td style="padding: 8px;">Execução local de modelos LLM</td>
</tr>

  <!-- Ambiente Virtual -->
  <tr>
    <td style="padding: 8px; text-align: center;">
      <img alt="Python venv" height="30" width="30" src="https://raw.githubusercontent.com/devicons/devicon/master/icons/python/python-original.svg" />
    </td>
    <td style="padding: 8px;">Python venv</td>
    <td style="padding: 8px;">Ambiente Isolado</td>
  </tr>
</table>

## ESTRUTURA DO PROJETO

O projeto terá a seguinte estrutura:

- Toda parte do front end da aplicação estará organizado na pasta [`frontend`](./frontend/)
- Toda parte da api de comunicação do sistema estará localizado no [`backend`](./backend/)
- Toda documentação Arquitetônica estaŕa na pasta [`Documentação Arquitetônica`](./Documentacao_Arquitetonica/)
- Toda imagem que projeto irá usar estará na pas [`img`](./img/)

```
.
  ├── backend
  │   ├─── config
  │   │   ├─── config.py
  |   |   └─── requirements.txt
  │   ├─── app.py
  │   └─── code.py
  ├─── frontend
  │   ├─── styles
  |   |   └─── styles.css
  │   ├─── script
  |   |   └─── script.js
  |   └─── index.html
  |
  ├─── Documentação Arquitetonica
  │   ├───Visão Arquitetônica Inicial
  │   ├───Modelagem de Ameaças
  |   └───Visão Arquitetônica Final e Mitigações
  ├─── img
  |   └─── DFD.jpeg
  ├─── ragflow_chats.json
  └─── README.md

```
## DOCUMENTAÇÃO ARQUITETÔNICA

Toda a análise arquitetônica, modelagem de ameaças e estratégias de mitigação do sistema estão detalhadas nos seguintes documentos:

1.  **[Visão Arquitetônica Inicial](./Documentacao_Arquitetonica/1_Visao_Arquitetonica_Inicial.md)**: Descreve a arquitetura funcional do sistema antes da análise de segurança.
2.  **[Modelagem de Ameaças](./Documentacao_Arquitetonica/2_Modelagem_de_Ameacas.md)**: Apresenta a análise de riscos e ameaças utilizando a metodologia STRIDE.
3.  **[Visão Arquitetônica Final e Mitigações](./Documentacao_Arquitetonica/3_Mitigacao_Visao_Arquitetonica_Final.md)**: Detalha a arquitetura aprimorada com os controles de segurança implementados.

## RODADNDO O PROJETO:

```bash
### 1. Clone o repositório

git clone https://github.com/WillianBrandao/gcc129-trabalho.git
cd gcc129-trabalho

#2. Crie um ambiente virtual

python -m venv venv
venv\Scripts\activate     # Windows
source venv/bin/activate  # Linux/macOS

#3. Instale as dependências

pip install -r requirements.txt

#4. Ajuste as variáveis de ambiente
#Acesse o diretório backend/config/config.py

CHAVE_API_RAG = "ragflow-..."       # sua chave de API da RAGFlow
URL_BASE_RAG = "http://localhost"   # base URL do servidor RAGFlow
NOME_ASSISTENTE = "Uflianinho"      # nome do assistente configurado]

#5. Executando o servidor

uvicorn backend.app:app --host 0.0.0.0 --port 8000 --reload

Acesse http://localhost:8000 no navegador para interagir com o chatbot.

```

## REGRAS DE USO:

- Regras de Commit:

  - Estrutura do Commit​​​​​​​: assunto, corpo e rodapé
    - Assunto: mensagens do commit
    - Corpo (opcional) - usado para fornecer mais detalhes sobre as mudanças feitas no commit
    - Rodapé (opcional) - lugar para referenciar questões relacionadas às alterações do commit

- Regras de Branch

  - Utilizar a branch develop para realizar alterações no código.
  - Somente realizar merge com a main após realizar os teste
  - Novas funcionalidades devem ser inseridas em novas branchs seguindo modelo `feature/<breve_descricao_da_funcionalidade>`

  ## REFERÊNCIAS

  ## DESENVOLVEDORES

  - [Ada](https://github.com/AdaVitoria)
  - [Gabriel](https://github.com/i-am-Gab)
  - [Ronan](https://github.com/carlettoronan)
  - [Willian Brandão](https://github.com/WillianBrandao)
