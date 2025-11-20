// Add this to dashboard.js after existing functions

// AI Chat function
async function sendAIChat() {
    const message = "Hello EchoMind! How can you help me?";
    const response = await fetch(`${API_BASE}/ai/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            message: message,
            userId: 'demo-user'
        })
    });
    const result = await response.json();
    console.log('AI Response:', result);
    alert(`AI: ${result.aiResponse}`);
}

// Call this to test
sendAIChat();
