const aiButton = document.getElementById('ai-button');
const aiChat = document.getElementById('ai-chat');

aiButton.addEventListener('click', () => {
    aiChat.classList.toggle('hidden');
});

document.getElementById('ai-input').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        const question = e.target.value;
        const answer = generateAnswer(question);
        document.getElementById('ai-messages').innerHTML += `<p>Вы: ${question}</p><p>ИИ: ${answer}</p>`;
        e.target.value = '';
    }
});

function generateAnswer(question) {
    const answers = {
        "рекомендация": "Попробуйте трек 'Neon Dreams'",
        "эквалайзер": "Эквалайзер можно настроить в разделе настроек",
        "профиль": "Перейдите в右上角 меню → 'Мой профиль'"
    };
    return answers[question.toLowerCase()] || "Я не понял вопрос. Попробуйте 'рекомендация', 'эквалайзер' или 'профиль'";
}
