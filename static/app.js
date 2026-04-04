// --- Configuration ---
const APP_NAME = "restaurant_concierge";
const USER_ID = "web_guest";
const API_URL = "/run";
const SESSION_URL = `/apps/${APP_NAME}/users/${USER_ID}/sessions`;

// --- State Management ---
let sessionId = localStorage.getItem("restaurant_concierge_session_id");
let messageHistory = JSON.parse(localStorage.getItem("restaurant_concierge_history")) || [];

// --- DOM Elements ---
const chatContainer = document.getElementById("chat-container").firstElementChild; // The inner max-w-3xl div
const chatScrollArea = document.getElementById("chat-container");
const chatForm = document.getElementById("chat-form");
const messageInput = document.getElementById("message-input");
const typingIndicator = document.getElementById("typing-indicator");
const resetBtn = document.getElementById("reset-session");

// --- Initialization ---
async function init() {
    if (!sessionId) {
        await createSession();
    }
    renderHistory();
    chatForm.addEventListener("submit", handleSendMessage);
    resetBtn.addEventListener("click", resetSession);
}

async function createSession() {
    try {
        const response = await fetch(SESSION_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ appName: APP_NAME, userId: USER_ID })
        });
        const data = await response.json();
        sessionId = data.id;
        localStorage.setItem("restaurant_concierge_session_id", sessionId);
    } catch (error) {
        console.error("Failed to create session:", error);
        sessionId = crypto.randomUUID();
        localStorage.setItem("restaurant_concierge_session_id", sessionId);
    }
}

// --- Functions ---

function renderHistory() {
    if (messageHistory.length > 0) {
        // Clear all but the first (welcome) message
        const welcome = chatContainer.children[0];
        chatContainer.innerHTML = '';
        chatContainer.appendChild(welcome);
        
        messageHistory.forEach(msg => {
            appendBubble(msg.role, msg.text);
        });
    }
}

function appendBubble(role, text) {
    const wrapper = document.createElement("div");
    wrapper.className = `${role === 'user' ? 'user-message-wrapper' : 'agent-message-wrapper'} message-appear`;
    
    // Replace newlines with <br>
    const formattedText = text.replace(/\n/g, '<br>');

    if (role === 'user') {
        wrapper.innerHTML = `
            <div class="user-bubble">
                <div class="bubble-content">${formattedText}</div>
            </div>
        `;
    } else {
        wrapper.innerHTML = `
            <div class="agent-icon">
                <i data-lucide="sparkles" class="w-4 h-4 text-emerald-600"></i>
            </div>
            <div class="agent-content">
                <div class="bubble-content">${formattedText}</div>
            </div>
        `;
    }
    
    chatContainer.appendChild(wrapper);
    
    // Re-trigger Lucide for new icons
    if (window.lucide) lucide.createIcons();
    
    // Scroll to bottom
    scrollToBottom();
}

function scrollToBottom() {
    chatScrollArea.scrollTo({
        top: chatScrollArea.scrollHeight,
        behavior: 'smooth'
    });
}

async function handleSendMessage(e) {
    e.preventDefault();
    const text = messageInput.value.trim();
    if (!text) return;

    // 1. UI: Add user bubble
    appendBubble('user', text);
    messageInput.value = '';
    
    // 2. State: Update history
    messageHistory.push({ role: 'user', text, timestamp: Date.now() });
    saveHistory();

    // 3. UI: Show typing
    typingIndicator.classList.remove('hidden');
    scrollToBottom();

    try {
        // 4. API: Call backend
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                appName: APP_NAME,
                userId: USER_ID,
                sessionId: sessionId,
                newMessage: {
                    parts: [{ text: text }]
                }
            })
        });

        if (!response.ok) throw new Error('Failed to fetch from agent');

        const data = await response.json();
        
        // 5. UI: Remove typing
        typingIndicator.classList.add('hidden');

        // 6. UI & State: Add agent bubble(s)
        data.forEach(item => {
            if (item.content && item.content.parts) {
                item.content.parts.forEach(part => {
                    if (part.text) {
                        appendBubble('agent', part.text);
                        messageHistory.push({ role: 'agent', text: part.text, timestamp: Date.now() });
                    }
                });
            }
        });
        saveHistory();

    } catch (error) {
        console.error(error);
        typingIndicator.classList.add('hidden');
        appendBubble('agent', "I'm sorry, I'm having trouble connecting to the kitchen right now. Please try again in a moment.");
    }
}

function saveHistory() {
    localStorage.setItem("restaurant_concierge_history", JSON.stringify(messageHistory));
}

function resetSession() {
    if (confirm("Clear this conversation?")) {
        sessionId = crypto.randomUUID();
        localStorage.setItem("restaurant_concierge_session_id", sessionId);
        messageHistory = [];
        localStorage.removeItem("restaurant_concierge_history");
        location.reload();
    }
}

// Start
init();
