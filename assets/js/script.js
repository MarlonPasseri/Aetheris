/**
 * script.js — Lógica interativa do site Forlith
 *
 * Responsabilidades:
 *  - Scroll suave para seções via atributo [data-scroll]
 *  - Chatbot assistente (toggle, envio de mensagens, respostas)
 *  - Navegação dos botões de serviço (sem inline onclick no HTML)
 */

// ----------------------------------------------------------
// Constantes
// ----------------------------------------------------------

/** Chaves válidas do chatbot */
const CHAT_KEYS = Object.freeze({
  SERVICOS: "servicos",
  PRAZO: "prazo",
  ORCAMENTO: "orcamento",
  PRECO: "preco",
  TECNOLOGIAS: "tecnologias",
  SAUDACAO: "saudacao",
  IDENTIDADE: "identidade",
  CONTATO: "contato",
  AGRADECIMENTO: "agradecimento",
});

/** Delay (ms) antes de exibir resposta do bot */
const BOT_REPLY_DELAY_MS = 1000;

/** E-mail de contato da empresa */
const CONTACT_EMAIL = "contato@forlith.com.br";

/** Respostas pré-definidas do assistente */
const BOT_ANSWERS = Object.freeze({
  [CHAT_KEYS.SERVICOS]: "Oferecemos desenvolvimento web, software sob medida, automações, consultoria técnica e arquitetura de sistemas.",
  [CHAT_KEYS.PRAZO]: "O prazo depende do escopo. Landing pages podem levar poucos dias, enquanto sistemas completos exigem análise e planejamento.",
  [CHAT_KEYS.ORCAMENTO]: "Você pode solicitar um orçamento pela página de contato. Vamos entender sua necessidade e retornar com uma proposta.",
  [CHAT_KEYS.PRECO]: "O valor depende do tipo de projeto, prazo, integrações e nível de complexidade.",
  [CHAT_KEYS.TECNOLOGIAS]: "Trabalhamos com HTML, CSS, JavaScript, React, Node.js, Python, Java, bancos de dados e soluções cloud.",
  [CHAT_KEYS.SAUDACAO]: "Olá! Como posso te ajudar hoje?",
  [CHAT_KEYS.IDENTIDADE]: "Sou o assistente virtual da Forlith! Estou aqui para tirar suas dúvidas rapidamente.",
  [CHAT_KEYS.CONTATO]: `Você pode falar com um humano enviando um e-mail para <a class="chat-link" href="mailto:${CONTACT_EMAIL}">${CONTACT_EMAIL}</a> ou pela página de <a class="chat-link" href="contact.html">Contato</a>.`,
  [CHAT_KEYS.AGRADECIMENTO]: "Por nada! Qualquer outra dúvida, é só chamar.",
});

// ----------------------------------------------------------
// Utilitários de texto
// ----------------------------------------------------------

/**
 * Normaliza um texto para comparação: minúsculas e sem acentos.
 * @param {string} text
 * @returns {string}
 */
function normalizeText(text) {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

// ----------------------------------------------------------
// Lógica do Chatbot
// ----------------------------------------------------------

/**
 * Retorna a resposta do bot com base no texto digitado pelo usuário.
 * Verifica as chaves em ordem de prioridade.
 * @param {string} userText
 * @returns {string} HTML da resposta
 */
function getBotAnswer(userText) {
  const normalized = normalizeText(userText);

  const matchRules = [
    { key: CHAT_KEYS.SAUDACAO, terms: ["oi", "ola", "bom dia", "boa tarde", "boa noite", "tudo bem", "opa"] },
    { key: CHAT_KEYS.IDENTIDADE, terms: ["quem e vc", "quem e voce", "quem e vc", "robo", "assistente", "nome"] },
    { key: CHAT_KEYS.CONTATO, terms: ["humano", "atendente", "falar com pessoa", "telefone", "whatsapp", "email"] },
    { key: CHAT_KEYS.AGRADECIMENTO, terms: ["obrigado", "valeu", "tchau", "ate logo", "agradeco"] },
    { key: CHAT_KEYS.SERVICOS, terms: ["servico", "fazem", "oferecem", "site", "aplicativo", "app"] },
    { key: CHAT_KEYS.PRAZO, terms: ["prazo", "tempo", "demora", "quando"] },
    { key: CHAT_KEYS.ORCAMENTO, terms: ["orcamento", "proposta", "cotacao"] },
    { key: CHAT_KEYS.PRECO, terms: ["preco", "valor", "custo", "pagar", "custa"] },
    { key: CHAT_KEYS.TECNOLOGIAS, terms: ["tecnologia", "stack", "linguagem", "framework"] },
  ];

  for (const { key, terms } of matchRules) {
    if (terms.some((term) => normalized.includes(term))) {
      return BOT_ANSWERS[key];
    }
  }

  return `Não tenho uma resposta pronta para isso. Envie sua dúvida pela página ` +
    `<a class="chat-link" href="contact.html">Contato</a> ` +
    `ou mande um e-mail para ` +
    `<a class="chat-link" href="mailto:${CONTACT_EMAIL}">${CONTACT_EMAIL}</a>.`;
}

/**
 * Cria e adiciona uma bolha de mensagem ao histórico do chat.
 * @param {HTMLElement} container - Elemento #chatMessages
 * @param {string} content - Conteúdo HTML da mensagem
 * @param {"user"|"bot"} type
 * @returns {HTMLElement} O elemento da mensagem criada
 */
function appendMessage(container, content, type = "bot") {
  const message = document.createElement("div");
  message.className = type === "user" ? "chat-user" : "chat-bot";
  message.innerHTML = content;
  container.appendChild(message);
  container.scrollTo({ top: container.scrollHeight, behavior: "smooth" });
  return message;
}

/**
 * Adiciona a bolha de "Digitando..." no chat.
 * @param {HTMLElement} container
 * @returns {HTMLElement}
 */
function showTypingIndicator(container) {
  const indicator = document.createElement("div");
  indicator.className = "chat-bot typing-indicator";
  indicator.innerHTML = "<span></span><span></span><span></span>";
  container.appendChild(indicator);
  container.scrollTo({ top: container.scrollHeight, behavior: "smooth" });
  return indicator;
}

/**
 * Processa o envio de uma mensagem do usuário:
 * exibe a mensagem, exibe o indicador de digitação,
 * aguarda o delay e exibe a resposta real do bot.
 * @param {string} text
 * @param {HTMLElement} messagesContainer
 * @param {HTMLInputElement|null} inputEl
 */
function sendMessage(text, messagesContainer, inputEl) {
  const trimmed = text.trim();
  if (!trimmed) return;

  if (inputEl) inputEl.value = "";
  appendMessage(messagesContainer, trimmed, "user");

  const typingBubble = showTypingIndicator(messagesContainer);

  setTimeout(() => {
    typingBubble.remove();
    appendMessage(messagesContainer, getBotAnswer(trimmed), "bot");
  }, BOT_REPLY_DELAY_MS);
}

/**
 * Inicializa o widget de chatbot: toggle, envio por botão,
 * envio por tecla Enter e botões de opções rápidas.
 */
function initChatbot() {
  const chatToggle = document.getElementById("chatToggle");
  const chatWindow = document.getElementById("chatWindow");
  const chatMessages = document.getElementById("chatMessages");
  const chatInput = document.getElementById("chatInput");
  const chatSend = document.getElementById("chatSend");
  const chatOptions = document.querySelectorAll(".chat-option");

  // Chatbot não está presente nesta página
  if (!chatToggle || !chatWindow || !chatMessages) return;

  chatToggle.addEventListener("click", () => {
    chatWindow.classList.toggle("hidden");
  });

  chatSend?.addEventListener("click", () => {
    sendMessage(chatInput.value, chatMessages, chatInput);
  });

  chatInput?.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      sendMessage(chatInput.value, chatMessages, chatInput);
    }
  });

  chatOptions.forEach((button) => {
    button.addEventListener("click", () => {
      const key = button.dataset.question;
      appendMessage(chatMessages, button.textContent, "user");

      const typingBubble = showTypingIndicator(chatMessages);

      setTimeout(() => {
        typingBubble.remove();
        const answer = BOT_ANSWERS[key] ?? getBotAnswer(button.textContent);
        appendMessage(chatMessages, answer, "bot");
      }, BOT_REPLY_DELAY_MS);
    });
  });

  // Fecha o chat ao apertar ESC
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !chatWindow.classList.contains("hidden")) {
      chatWindow.classList.add("hidden");
    }
  });
}

// ----------------------------------------------------------
// Scroll suave
// ----------------------------------------------------------

/**
 * Registra o comportamento de scroll suave para todos os
 * elementos com o atributo [data-scroll="id-da-secao"].
 */
function initSmoothScroll() {
  const scrollTriggers = document.querySelectorAll("[data-scroll]");

  scrollTriggers.forEach((trigger) => {
    trigger.addEventListener("click", () => {
      const targetId = trigger.getAttribute("data-scroll");
      const section = document.getElementById(targetId);

      if (section) {
        section.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  });
}

// ----------------------------------------------------------
// Navegação dos botões de serviço (sem onclick inline)
// ----------------------------------------------------------

/**
 * Registra os botões de serviço na página inicial
 * para navegação entre páginas sem usar onclick inline.
 */
function initServiceButtons() {
  const serviceRoutes = {
    "btn-web-engineering": "WebEng.html",
    "btn-custom-software": "CustomSoft.html",
    "btn-tech-consulting": "contact.html",
  };

  for (const [id, href] of Object.entries(serviceRoutes)) {
    const button = document.getElementById(id);
    if (button) {
      button.addEventListener("click", () => {
        window.location.href = href;
      });
    }
  }
}

// ----------------------------------------------------------
// Animações de Scroll
// ----------------------------------------------------------

/**
 * Inicializa a API de Intersection Observer para disparar as animações
 * dos elementos com a classe .animate-on-scroll.
 */
function initScrollAnimations() {
  const elements = document.querySelectorAll(".animate-on-scroll");

  if (!elements.length) return;

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target); // Para animar apenas 1 vez
      }
    });
  }, {
    root: null,
    rootMargin: "0px 0px -50px 0px", // Dispara um pouco antes do elemento aparecer
    threshold: 0.1 // Dispara quando 10% do elemento estiver visível
  });

  elements.forEach((el) => observer.observe(el));
}

// ----------------------------------------------------------
// Bootstrap
// ----------------------------------------------------------

document.addEventListener("DOMContentLoaded", () => {
  initSmoothScroll();
  initChatbot();
  initServiceButtons();
  initScrollAnimations();
  // initCustomCursor();
  initContactForm();
});

// ----------------------------------------------------------
// Cursor Cyber Magnético
// ----------------------------------------------------------
function initCustomCursor() {
  const dot = document.getElementById("cyber-cursor-dot");
  const ring = document.getElementById("cyber-cursor-ring");

  if (!dot || !ring) return;

  let mouseX = 0;
  let mouseY = 0;
  let ringX = 0;
  let ringY = 0;

  // Atualizar a posição do mouse e mostrar o cursor
  document.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;

    dot.style.opacity = "1";
    ring.style.opacity = "1";

    // O dot segue instantaneamente
    dot.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
  });

  // O anel tem um pequeno "delay" (easing)
  function animateRing() {
    ringX += (mouseX - ringX) * 0.15;
    ringY += (mouseY - ringY) * 0.15;

    ring.style.transform = `translate(${ringX}px, ${ringY}px)`;
    requestAnimationFrame(animateRing);
  }
  animateRing();

  // Efeito "Magnético" sobre links e botões
  const hoverables = document.querySelectorAll("a, button, .chat-option, .glass-panel");

  hoverables.forEach((el) => {
    el.addEventListener("mouseenter", () => {
      ring.style.width = "48px";
      ring.style.height = "48px";
      ring.style.backgroundColor = "rgba(0, 240, 255, 0.1)";
      // Ajustar o transform compensando o novo tamanho (48px / 2 = 24)
      ring.style.marginLeft = "-8px";
      ring.style.marginTop = "-8px";
    });

    el.addEventListener("mouseleave", () => {
      ring.style.width = "32px";
      ring.style.height = "32px";
      ring.style.backgroundColor = "transparent";
      ring.style.marginLeft = "0";
      ring.style.marginTop = "0";
    });
  });
}

// ----------------------------------------------------------
// Formulário Ajax (Background Fetch)
// ----------------------------------------------------------
function initContactForm() {
  const form = document.getElementById("contactForm");
  if (!form) return;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const submitBtn = form.querySelector("button[type='submit']");
    const originalText = submitBtn.innerText;

    // Feedback visual "Enviando"
    submitBtn.innerText = "ENVIANDO PROTOCOLO...";
    submitBtn.style.opacity = "0.7";
    submitBtn.style.pointerEvents = "none";

    try {
      const response = await fetch(form.action, {
        method: form.method,
        body: new FormData(form),
        headers: {
          'Accept': 'application/json'
        }
      });

      if (response.ok) {
        // Sucesso
        submitBtn.innerText = "PROTOCOLO RECEBIDO";
        submitBtn.style.backgroundColor = "#00f0ff";
        submitBtn.style.color = "#000";
        submitBtn.style.opacity = "1";

        form.reset();

        // Voltar ao normal após 4 segundos
        setTimeout(() => {
          submitBtn.innerText = originalText;
          submitBtn.style.backgroundColor = "";
          submitBtn.style.color = "";
          submitBtn.style.pointerEvents = "auto";
        }, 4000);

      } else {
        throw new Error("Erro no servidor");
      }
    } catch (error) {
      submitBtn.innerText = "FALHA NA CONEXÃO. TENTE NOVAMENTE.";
      submitBtn.style.backgroundColor = "#ff3333";
      submitBtn.style.color = "#fff";
      submitBtn.style.opacity = "1";

      setTimeout(() => {
        submitBtn.innerText = originalText;
        submitBtn.style.backgroundColor = "";
        submitBtn.style.color = "";
        submitBtn.style.pointerEvents = "auto";
      }, 4000);
    }
  });
}
