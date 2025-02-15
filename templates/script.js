document.addEventListener("DOMContentLoaded", function () {
    const chatHistory = document.getElementById("chat-history");
    const userInput = document.getElementById("user-input");
    const sendButton = document.getElementById("send-button");

    sendButton.addEventListener("click", function () {
        const userMessage = userInput.value.trim();
        if (userMessage === "") return;

        addMessage(userMessage, "user-message");

        // Simulating a bot response after 1 second
        setTimeout(() => {
            const botResponse = getBotResponse(userMessage);
            addMessage(botResponse, "bot-message");
        }, 1000);

        userInput.value = "";
    });

    userInput.addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            sendButton.click();
        }
    });

    function addMessage(text, className) {
        const messageDiv = document.createElement("div");
        messageDiv.classList.add("message", className);
        messageDiv.textContent = text;
        chatHistory.appendChild(messageDiv);
        chatHistory.scrollTop = chatHistory.scrollHeight; // Auto-scroll to bottom
    }

    function getBotResponse(userMessage) {
        const responses = {
            "hello": "Hi there! How can I assist you today?",
            "how are you": "I'm just a bot, but I'm doing great! What about you?",
            "what is your name": "I'm Gemini Chatbot! Ready to assist you.",
            "bye": "Goodbye! Have a great day! 😊"
        };

        const lowerCaseMessage = userMessage.toLowerCase();
        return responses[lowerCaseMessage] || "I'm not sure how to respond to that. 🤖";
    }
});
