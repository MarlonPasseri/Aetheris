console.log("chat carregado");

document.addEventListener("DOMContentLoaded", () => {
  const scrollButtons = document.querySelectorAll("[data-scroll]");

  scrollButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const id = button.getAttribute("data-scroll");
      const section = document.getElementById(id);

      if (section) {
        section.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  });

  const chatToggle = document.getElementById("chatToggle");
  const chatWindow = document.getElementById("chatWindow");
  const chatMessages = document.getElementById("chatMessages");
  const chatInput = document.getElementById("chatInput");
  const chatSend = document.getElementById("chatSend");
  const chatOptions = document.querySelectorAll(".chat-option");

  if (!chatToggle || !chatWindow || !chatMessages) return;

  const chatbotAnswers = {
    servicos: "Oferecemos desenvolvimento web, software sob medida, automações, consultoria técnica e arquitetura de sistemas.",
    prazo: "O prazo depende do escopo. Landing pages podem levar poucos dias, enquanto sistemas completos exigem análise e planejamento.",
    orcamento: "Você pode solicitar um orçamento pela página de contato. Vamos entender sua necessidade e retornar com uma proposta.",
    preco: "O valor depende do tipo de projeto, prazo, integrações e nível de complexidade.",
    tecnologias: "Trabalhamos com HTML, CSS, JavaScript, React, Node.js, Python, Java, bancos de dados e soluções cloud."
  };

  function addMessage(content, type = "bot") {
    const message = document.createElement("div");
    message.className = type === "user" ? "chat-user" : "chat-bot";
    message.innerHTML = content;

    chatMessages.appendChild(message);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  function normalizeText(text) {
    return text
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");
  }

  function getBotAnswer(text) {
    const normalized = normalizeText(text);

    if (normalized.includes("servico") || normalized.includes("fazem")) {
      return chatbotAnswers.servicos;
    }

    if (normalized.includes("prazo") || normalized.includes("tempo") || normalized.includes("demora")) {
      return chatbotAnswers.prazo;
    }

    if (normalized.includes("orcamento") || normalized.includes("proposta")) {
      return chatbotAnswers.orcamento;
    }

    if (normalized.includes("preco") || normalized.includes("valor") || normalized.includes("custo")) {
      return chatbotAnswers.preco;
    }

    if (normalized.includes("tecnologia") || normalized.includes("stack")) {
      return chatbotAnswers.tecnologias;
    }

    return 'Não tenho uma resposta pronta para isso. Envie sua dúvida pela página <a class="chat-link" href="contact.html">Contact</a> ou mande um e-mail para <a class="chat-link" href="mailto:seuemail@seudominio.com">seuemail@seudominio.com</a>.';
  }

  function sendChatMessage(text) {
    if (!text.trim()) return;

    addMessage(text, "user");

    setTimeout(() => {
      addMessage(getBotAnswer(text), "bot");
    }, 300);

    if (chatInput) chatInput.value = "";
  }

  chatToggle.addEventListener("click", () => {
    chatWindow.classList.toggle("hidden");
  });

  chatSend?.addEventListener("click", () => {
    sendChatMessage(chatInput.value);
  });

  chatInput?.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      sendChatMessage(chatInput.value);
    }
  });

  chatOptions.forEach((button) => {
    button.addEventListener("click", () => {
      const key = button.dataset.question;

      addMessage(button.textContent, "user");

      setTimeout(() => {
        addMessage(chatbotAnswers[key] || getBotAnswer(button.textContent), "bot");
      }, 300);
    });
  });
});