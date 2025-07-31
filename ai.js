document.getElementById('ai-btn').addEventListener('click', () => {
    const question = prompt("Задайте вопрос ИИ (например: 'рекомендация'):");
    
    if (question) {
        const answer = getAIResponse(question);
        alert(`ИИ: ${answer}`);
    }
});

function getAIResponse(question) {
    const responses = {
        "рекомендация": "Попробуйте трек 'Cyber Dreams'",
        "эквалайзер": "Откройте настройки → Аудио → Эквалайзер",
        "профиль": "Настройки профиля в右上角 меню"
    };
    
    return responses[question.toLowerCase()] || "Я не понял вопрос";
}
