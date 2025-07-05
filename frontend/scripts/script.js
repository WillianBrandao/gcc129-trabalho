document.addEventListener("DOMContentLoaded", () => {
  const chatMessages = document.getElementById("chat-messages");
  const userInput = document.getElementById("user-input");
  const sendButton = document.getElementById("send-button");

  let idSessao = null; // guarda o id da sessão retornado pelo backend

  function addMessage(text, sender) {
    const messageDiv = document.createElement("div");
    messageDiv.classList.add("message", `${sender}-message`);

    const paragraph = document.createElement("p");
    paragraph.textContent = text;

    messageDiv.appendChild(paragraph);
    chatMessages.appendChild(messageDiv);

    chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  function autoResizeTextarea() {
    userInput.style.height = "auto";
    userInput.style.height = userInput.scrollHeight + 2 + "px";
  }

  async function sendMessage() {
    const textoMensagem = userInput.value.trim();
    if (textoMensagem === "") return;

    addMessage(textoMensagem, "user");
    userInput.value = "";
    userInput.style.height = "auto"; 

    try {
      const resposta = await fetch("http://localhost:8000/perguntar", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ pergunta: textoMensagem, id_sessao: idSessao }),
      });

      if (!resposta.ok) {
        throw new Error(`Erro HTTP! Status: ${resposta.status}`);
      }

      const dados = await resposta.json();
      idSessao = dados.id_sessao; // atualiza o id da sessão

      const textoResposta = dados.resposta || "Desculpe, não consegui processar sua solicitação.";
      addMessage(textoResposta, "bot");

    } catch (error) {
      console.error("Erro ao comunicar com o backend:", error);
      addMessage(
        "Ops! Ocorreu um erro ao tentar obter a resposta. Por favor, tente novamente mais tarde.",
        "bot"
      );
    }
  }

  sendButton.addEventListener("click", sendMessage);

  userInput.addEventListener("keypress", (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      sendMessage();
    }
  });

  userInput.addEventListener("input", autoResizeTextarea);

  autoResizeTextarea();
});
