// Theme toggle button functionality
const themeToggleBtn = document.getElementById('theme-toggle');

// Check for saved theme preference in localStorage
if (localStorage.getItem('theme') === 'dark') {
    document.body.classList.add('dark-mode');
    themeToggleBtn.textContent = '🌙'; // For dark mode, show moon icon
} else {
    document.body.classList.remove('dark-mode');
    themeToggleBtn.textContent = '🌞'; // For light mode, show sun icon
}

// Toggle the theme
themeToggleBtn.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    const isDarkMode = document.body.classList.contains('dark-mode');

    // Save the theme preference in localStorage
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');

    // Toggle the button icon
    themeToggleBtn.textContent = isDarkMode ? '🌙' : '🌞';
});

// Button for generating notes functionality
document.getElementById('generate-btn').addEventListener('click', function() {
    const userInput = document.getElementById('user-input').value;
    if (userInput.trim() === "") {
        alert("Please enter a prompt.");
        return;
    }

    // Display user's input as a chat bubble
    const chatContainer = document.getElementById('chat-container');
    const userBubble = document.createElement('div');
    userBubble.classList.add('chat-bubble', 'user-bubble');
    userBubble.textContent = userInput;
    chatContainer.appendChild(userBubble);

    // Scroll to the bottom of the chat container
    chatContainer.scrollTop = chatContainer.scrollHeight;

    // Clear the input field
    document.getElementById('user-input').value = "";

    // Generate AI response
    fetch('/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user_input: userInput })
    })
    .then(response => response.json())
    .then(data => {
        if (data.response) {
            // Display AI's response as a chat bubble
            const botBubble = document.createElement('div');
            botBubble.classList.add('chat-bubble', 'bot-bubble');
            botBubble.textContent = data.response;
            chatContainer.appendChild(botBubble);
        } else {
            const botBubble = document.createElement('div');
            botBubble.classList.add('chat-bubble', 'bot-bubble');
            botBubble.textContent = "Sorry, I couldn't generate notes.";
            chatContainer.appendChild(botBubble);
        }

        // Scroll to the bottom of the chat container
        chatContainer.scrollTop = chatContainer.scrollHeight;
    })
    .catch(error => {
        const botBubble = document.createElement('div');
        botBubble.classList.add('chat-bubble', 'bot-bubble');
        botBubble.textContent = "Error: Unable to generate notes.";
        chatContainer.appendChild(botBubble);
        chatContainer.scrollTop = chatContainer.scrollHeight;
    });
});
