// static/js/script.js
document.addEventListener('DOMContentLoaded', function () {
    const userInput = document.getElementById('user-input');
    const sendButton = document.getElementById('send-button');
    const chatHistory = document.getElementById('chat-history');

    sendButton.addEventListener('click', sendMessage);

    userInput.addEventListener('keydown', function (event) {
        if (event.key === 'Enter') {
            sendMessage();
        }
    });

    function sendMessage() {
        const message = userInput.value.trim();
        if (message) {
            displayMessage(message, 'user');
            userInput.value = ''; // Clear the input

            // Send the message to the backend
            fetch('/get_response', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ message: message })
            })
                .then(response => response.json())
                .then(data => {
                    displayMessage(data.response, 'bot');
                })
                .catch(error => {
                    console.error('Error:', error);
                    displayMessage('Sorry, I encountered an error.', 'bot');
                });
        }
    }

    function displayMessage(message, sender) {
        const messageElement = document.createElement('div');
        messageElement.classList.add('message');
        messageElement.classList.add(sender); // 'user' or 'bot'
        messageElement.textContent = message;
        chatHistory.appendChild(messageElement);

        // Scroll to the bottom to show the latest message
        chatHistory.scrollTop = chatHistory.scrollHeight;
    }
});
