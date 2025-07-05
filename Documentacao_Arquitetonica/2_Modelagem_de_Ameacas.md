# 2. Modelagem de Ameaças e Estratégias de Mitigação

## 2.1. Metodologia de Análise

Para a identificação e categorização de ameaças, este projeto adota o modelo **STRIDE**, uma metodologia que foca em seis categorias de ameaças à segurança.

-   **S**poofing (Falsificação de Identidade): Fingir ser algo ou alguém que não é.
-   **T**ampering (Violação de Dados): Modificar dados sem autorização.
-   **R**epudiation (Negação de Ações): Negar ter realizado uma ação.
-   **I**nformation Disclosure (Exposição de Informações): Expor informações a quem não tem permissão.
-   **D**enial of Service (Negação de Serviço): Derrubar ou degradar um serviço para usuários legítimos.
-   **E**levation of Privilege (Elevação de Privilégio): Obter capacidades ou acesso sem a devida autorização.

## 2.2. Superfície de Ataque

A superfície de ataque do nosso sistema inclui os seguintes pontos de interação:

-   A interface web (Frontend).
-   A API pública do Backend.
-   A comunicação entre o Backend e o agente de IA local (Ollama).
-   A comunicação entre o Backend e o agente de IA externo.

## 2.3. Matriz de Análise de Ameaças STRIDE

A tabela a seguir detalha as ameaças identificadas em cada componente do sistema, classificadas pelo modelo STRIDE.

### Tabela 2: Matriz de Análise de Ameaças STRIDE

| Componente | Spoofing | Tampering | Repudiation | Information Disclosure | Denial of Service | Elevation of Privilege |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Frontend** | Um atacante pode criar uma página falsa para roubar credenciais (phishing). | Injeção de scripts maliciosos (XSS) para alterar o conteúdo da página. | - | Exposição de chaves de API no código cliente. | - | - |
| **Backend API** | Requisições forjadas (CSRF) ou de servidores não autorizados. | Manipulação de parâmetros na API para alterar a lógica de negócio. | Um usuário/serviço nega ter enviado uma requisição. | Acesso não autorizado a dados de outros usuários. | Ataques de sobrecarga (DDoS) na API. | Obter acesso de admin através de falhas na API. |
| **Comunicação (Backend <> IAs)**| Um serviço malicioso na rede se passa por um agente de IA legítimo. | Interceptação e alteração das respostas da IA (Man-in-the-Middle). | - | Vazamento de dados sensíveis na comunicação em texto plano. | Interrupção da comunicação entre os serviços. | - |
| **Agente (Ollama)** | - | Modificação não autorizada dos modelos ou da base de conhecimento. | - | "Jailbreaking" para extrair informações do prompt ou da base de dados. | Sobrecarregar o modelo com requisições complexas. | Acesso ao contêiner Docker para executar comandos no host. |

## 2.4. Sumário dos Riscos Críticos

Com base na análise, os riscos mais críticos são:

1.  **Information Disclosure (Exposição de Informações)**: A comunicação entre os microsserviços em texto plano é um grande risco, podendo expor todo o tráfego.
2.  **Tampering (Violação de Dados)**: Ataques de Man-in-the-Middle na comunicação interna e injeção de dados maliciosos na API pública.
3.  **Denial of Service (Negação de Serviço)**: A API do Backend é um ponto central de falha e um alvo para ataques de sobrecarga.
