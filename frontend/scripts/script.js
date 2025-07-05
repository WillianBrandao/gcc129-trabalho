document.addEventListener("DOMContentLoaded", () => {
  const chatMessages = document.getElementById("chat-messages");
  const userInput     = document.getElementById("user-input");
  const sendButton    = document.getElementById("send-button");

  let idSessao        = null;          // ID da sessão
  let statusDiv       = null;          // <div> “Aguardando…”
  let loadingInterval = null;          // setInterval para animar reticências

  /* ---------- utilidades ---------- */
  function addMessage(text, sender) {
    const msg = document.createElement("div");
    msg.classList.add("message", ${sender}-message);
    msg.innerHTML = <p>${text}</p>;
    chatMessages.appendChild(msg);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  function autoResizeTextarea() {
    userInput.style.height = "auto";
    userInput.style.height = ${userInput.scrollHeight + 2}px;
  }

  /* ---------- status (“Aguardando…”) ---------- */
  function showStatus() {
    statusDiv = document.createElement("div");
    statusDiv.classList.add("status-message");
    statusDiv.textContent = "Aguardando resposta";
    chatMessages.appendChild(statusDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;

    // animação de reticências: .  ..  ... 
    const dots = [" .", " ..", " ..."];
    let i = 0;
    loadingInterval = setInterval(() => {
      statusDiv.textContent = "Aguardando resposta" + dots[i % dots.length];
      i++;
    }, 400);      // ajuste o ritmo como quiser
  }

  function removeStatus() {
    clearInterval(loadingInterval);
    loadingInterval = null;
    if (statusDiv) {
      chatMessages.removeChild(statusDiv);
      statusDiv = null;
    }
  }

  /* ---------- botão ---------- */
  function lockButton() {
    sendButton.disabled = true;
    sendButton.classList.add("loading");
    sendButton.innerHTML = "Aguardando&nbsp;<span class=\"spinner\"></span>";
  }
  function unlockButton() {
    sendButton.disabled = false;
    sendButton.classList.remove("loading");
    sendButton.textContent = "Enviar";
  }

  /* ---------- envio ---------- */
  async function sendMessage() {
    const texto = userInput.value.trim();
    if (texto === "" || sendButton.disabled) return;

    addMessage(texto, "user");
    userInput.value = "";
    userInput.style.height = "auto";

    lockButton();
    showStatus();

    try {
      const resp = await fetch("http://localhost:8000/perguntar", {
        method : "POST",
        headers: { "Content-Type": "application/json" },
        body   : JSON.stringify({ pergunta: texto, id_sessao: idSessao }),
      });
      if (!resp.ok) throw new Error(HTTP ${resp.status});

      const dados = await resp.json();
      idSessao = dados.id_sessao;
      addMessage(dados.resposta || "Desculpe, não consegui processar sua solicitação.", "bot");

    } catch (e) {
      console.error(e);
      addMessage("Ops! Ocorreu um erro. Tente novamente mais tarde.", "bot");
    } finally {
      removeStatus();
      unlockButton();
      userInput.focus();
    }
  }

  /* ---------- eventos ---------- */
  sendButton.addEventListener("click", sendMessage);

  userInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  });

  userInput.addEventListener("input", autoResizeTextarea);
  autoResizeTextarea();
});