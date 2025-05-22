function fetchJSON(url){
    fetch(url)
        .then(response => {
            if(!response.ok){
                throw new Error('Network response was not ok');
            }
            return response.json();
        })

        .then(data => {
            if (Object.keys(data).length === 0 && data.constructor === Object) {
                throw new Error('Empty JSON or malformed JSON');
            }

        console.log(data);
        sendMessage(data.intents);
        })

        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });
}

function showMessage(message, type) {
    const chatBox = document.getElementById('chat-box');
    const messageDiv = document.createElement('div');
    messageDiv.className = type === 'user' ? 'user-message' : 'bot-message';
    messageDiv.textContent = message;
    chatBox.appendChild(messageDiv);
    chatBox.scrollTop = chatBox.scrollHeight; // Scroll to bottom
}

function processMessage(intents, messageUser) {
    messageUser = messageUser.toLowerCase();

    for (let intent of intents) { // NOT intents.intents
        for (let pattern of intent.patterns) {
            if (messageUser.includes(pattern.toLowerCase())) {
                const responses = intent.responses;
                return responses[Math.floor(Math.random() * responses.length)];
            }
        }
    }

    return "I'm sorry, I don't understand. Can you try rephrasing?";
}

function sendMessage(intents) {
    const inputElement = document.getElementById('user-input');
    const userMessage = inputElement.value.trim();

    if (userMessage === '') return;

    // a. Retrieve user input
    // b. Show user's message
    showMessage(userMessage, 'user');

    // c. Get bot response
    const botResponse = processMessage(intents, userMessage);

    // d. Show bot's response
    showMessage(botResponse, 'bot');

    // e. Clear input field
    inputElement.value = '';
}