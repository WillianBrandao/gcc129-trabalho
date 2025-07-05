# 3. Visão Arquitetônica Final (Pós-Mitigação)

## 3.1. Introdução

Após a análise de riscos detalhada no documento de Modelagem de Ameaças, a arquitetura inicial foi aprimorada com a adição de múltiplos controles de segurança. Esta Visão Arquitetônica Final descreve a estrutura do sistema com as medidas de mitigação implementadas para garantir a confidencialidade, integridade e disponibilidade das informações.

## 3.2. Estratégias de Mitigação e Aprimoramentos

As seguintes estratégias foram incorporadas ao design do sistema para tratar as ameaças identificadas pelo modelo STRIDE.

### 3.2.1. Implementação de um API Gateway

Um **API Gateway** foi introduzido como o único ponto de entrada para todas as requisições externas. Ele é responsável por:

-   **Autenticação e Autorização**: Validar todas as chamadas para a API.
-   **Rate Limiting**: Limitar o número de requisições para mitigar ataques de Negação de Serviço (DoS).
-   **Roteamento Centralizado**: Encaminhar as requisições para o microserviço de Backend.
-   **Offloading de SSL/TLS**: Gerenciar a criptografia da comunicação externa (HTTPS).

### 3.2.2. Segurança na Comunicação Interna com mTLS

Para proteger a comunicação entre o Backend e os agentes de IA contra ataques de *Spoofing*, *Tampering* e *Information Disclosure*, foi implementado o **mTLS (Mutual TLS)**.

-   **Autenticação Mútua**: Tanto o cliente (Backend) quanto o servidor (Agente de IA) apresentam certificados digitais para provar suas identidades.
-   **Criptografia de ponta a ponta**: Todo o tráfego na rede interna é criptografado, impedindo que seja lido ou modificado por um atacante na rede.

## 3.3. Arquitetura Aprimorada e Novo Fluxo de Dados

1.  **Usuário -> API Gateway**: O usuário envia a pergunta via HTTPS para o API Gateway.
2.  **API Gateway -> Backend**: O Gateway autentica a requisição, verifica os limites de uso e a encaminha para a API do Backend.
3.  **Backend -> Agentes de IA (via mTLS)**: A comunicação entre o Backend e os agentes de IA é protegida com mTLS, garantindo que apenas serviços autorizados possam se comunicar e que os dados estejam criptografados.
4.  **Retorno Seguro**: O fluxo de retorno segue o mesmo caminho seguro.


## 3.4. Resumo das Mitigações vs. Ameaças

A tabela abaixo conecta as medidas de segurança implementadas com as ameaças STRIDE que elas mitigam.

### Tabela 3: Medidas de Mitigação e Impacto nas Ameaças

| Medida de Segurança | Ameaça STRIDE Mitigada | Descrição |
| :--- | :--- | :--- |
| **HTTPS (no Gateway)** | Information Disclosure, Tampering | Criptografa a comunicação entre o cliente e o sistema. |
| **API Gateway** | Denial of Service, Spoofing | Centraliza o controle de acesso e implementa Rate Limiting. |
| **mTLS Interno** | Spoofing, Tampering, Information Disclosure | Garante que apenas os microsserviços legítimos se comuniquem e criptografa o tráfego interno. |
| **Validação de Inputs** | Tampering, Elevation of Privilege | Impede a injeção de dados maliciosos (XSS, SQL Injection) na API. |
| **Logs de Auditoria** | Repudiation | Registra as ações realizadas para que não possam ser negadas. |
| **Container Hardening** | Elevation of Privilege | Aplica configurações de segurança nos contêineres Docker para limitar o acesso ao host. |

## 3.5. Conclusão

A arquitetura final é significativamente mais robusta e resiliente. Ao integrar a segurança desde a fase de design (*Security by Design*), o sistema está preparado para se defender contra as ameaças mais comuns, garantindo a proteção dos dados e a confiabilidade do serviço para a comunidade da UFLA. Este documento será atualizado conforme o projeto evoluir.
