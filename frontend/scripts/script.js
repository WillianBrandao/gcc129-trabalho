document.addEventListener("DOMContentLoaded", () => {
  const chatMessages = document.getElementById("chat-messages");
  const userInput = document.getElementById("user-input");
  const sendButton = document.getElementById("send-button");

  // Função para adicionar uma mensagem ao chat
  function addMessage(text, sender) {
    const messageDiv = document.createElement("div");
    messageDiv.classList.add("message");
    messageDiv.classList.add(`${sender}-message`);

    const paragraph = document.createElement("p");
    paragraph.textContent = text;

    messageDiv.appendChild(paragraph);
    chatMessages.appendChild(messageDiv);

    // Rolar para a última mensagem
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  // Função para enviar a mensagem
  async function sendMessage() {
    const messageText = userInput.value.trim();
    if (messageText === "") return;

    addMessage(messageText, "user");
    userInput.value = "";

    try {
      // Substituir URL DA API
      const response = await fetch("http://localhost:8000/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: messageText }),
      });

      if (!response.ok) {
        throw new Error(`Erro HTTP! Status: ${response.status}`);
      }

      const data = await response.json();
      const botResponseText =
        data.response || "Desculpe, não consegui processar sua solicitação.";
      addMessage(botResponseText, "bot");
    } catch (error) {
      console.error("Erro ao comunicar com o backend:", error);
      addMessage(
        "Ops! Ocorreu um erro ao tentar obter a resposta. Por favor, tente novamente mais tarde.",
        "bot"
      );
    }
  }

  // Evento para o botão de envio
  sendButton.addEventListener("click", sendMessage);

  // Evento para a tecla Enter no campo de entrada
  userInput.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
      sendMessage();
    }
  });
});
