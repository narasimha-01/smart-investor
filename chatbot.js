document.addEventListener('DOMContentLoaded', () => {
    const chatbotToggle = document.getElementById('chatbot-toggle');
    const chatbotContainer = document.getElementById('chatbot-container');
    const chatbotClose = document.getElementById('chatbot-close');
    const chatbotBody = document.getElementById('chatbot-body');
    const chatbotInput = document.getElementById('chatbot-input');
    const chatbotSend = document.getElementById('chatbot-send');

    chatbotToggle.addEventListener('click', (e) => {
        e.preventDefault();
        chatbotContainer.classList.toggle('active');
    });

    chatbotClose.addEventListener('click', () => {
        chatbotContainer.classList.remove('active');
    });

    chatbotSend.addEventListener('click', sendMessage);
    chatbotInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });

    function sendMessage() {
        const userMessage = chatbotInput.value.trim();
        if (userMessage === '') return;

        // Add user message to chat body
        appendMessage(userMessage, 'user');
        chatbotInput.value = '';

        // Get bot response
        setTimeout(() => {
            const botResponse = getBotResponse(userMessage);
            appendMessage(botResponse, 'bot');
        }, 500);
    }

    function appendMessage(text, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('chat-message', `${sender}-message`);
        messageDiv.innerHTML = `<p>${text}</p>`;
        chatbotBody.appendChild(messageDiv);
        chatbotBody.scrollTop = chatbotBody.scrollHeight;
    }

    function getBotResponse(input) {
        const lowerInput = input.toLowerCase();

        if (lowerInput.includes('sip')) {
            return `A Systematic Investment Plan (SIP) is a method of investing in mutual funds where you invest a fixed amount at regular intervals (e.g., monthly). It helps in rupee cost averaging and instills investment discipline.`;
        }
        if (lowerInput.includes('how much') && lowerInput.includes('invest')) {
            return `A common rule of thumb is the 50-30-20 rule: 50% for needs, 30% for wants, and 20% for savings and investments. However, this depends on your income and goals.`;
        }
        if (lowerInput.includes('fd') && lowerInput.includes('sip')) {
            return `A Fixed Deposit (FD) is a low-risk investment that offers fixed returns. An SIP, on the other hand, is a disciplined way to invest in mutual funds, which are market-linked and have higher risk but also potential for higher returns.`;
        }
        if (lowerInput.includes('compounding')) {
            return `Compounding is the process of earning returns on your initial investment as well as on the accumulated interest or returns over time. It's often called "interest on interest" and is a key to long-term wealth creation.`;
        }
        if (lowerInput.includes('thank you') || lowerInput.includes('thanks')) {
            return `You're welcome! Happy to help.`;
        }
        if (lowerInput.includes('hello') || lowerInput.includes('hi')) {
            return `Hello there! How can I assist you with your investment queries today?`;
        }

        return `I'm not sure how to answer that. Please ask a question about SIP, FD, or compounding.`;
    }
});