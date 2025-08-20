import { words } from './data.js';
import { speak } from './tts.js';

let currentMode = '';

export function initializeTrainer() {
    // Инициализация не требуется для базовой версии
}

export function showTrainer(mode) {
    currentMode = mode;
    const modal = document.getElementById('trainerModal');
    const content = document.getElementById('trainerContent');
    const learned = Array.from(document.querySelectorAll('input[type="checkbox"]:checked'))
        .map(cb => cb.dataset.word);
    let filteredWords = words.filter(w => !learned.includes(w.norsk));

    if (filteredWords.length === 0) {
        content.innerHTML = '<p>Все слова изучены! Выберите новые.</p>';
        modal.style.display = 'block';
        return;
    }

    switch (mode) {
        case 'flashcards':
            let index = 0;
            content.innerHTML = `
                <h3>Карточки</h3>
                <p id="flashcard">${filteredWords[index].norsk}</p>
                <button onclick="nextFlashcard()">Далее</button>
            `;
            window.nextFlashcard = () => {
                index = (index + 1) % filteredWords.length;
                document.getElementById('flashcard').textContent = filteredWords[index].norsk;
                speak(filteredWords[index].norsk);
            };
            speak(filteredWords[index].norsk);
            break;
        case 'quiz':
            const word = filteredWords[Math.floor(Math.random() * filteredWords.length)];
            const options = [word.translation, ...Array(3).fill().map(() => words[Math.floor(Math.random() * words.length)].translation)].sort(() => Math.random() - 0.5);
            content.innerHTML = `
                <h3>Тест</h3>
                <p>${word.norsk} = ?</p>
                ${options.map(opt => `<button onclick="checkAnswer('${opt}', '${word.translation}')">${opt}</button>`).join('')}
            `;
            break;
        case 'typing':
            const typingWord = filteredWords[Math.floor(Math.random() * filteredWords.length)];
            content.innerHTML = `
                <h3>Диктант</h3>
                <p>Напишите: <span onclick="speak('${typingWord.norsk}')">🔊 ${typingWord.norsk}</span></p>
                <input id="typingInput" type="text">
                <button onclick="checkTyping('${typingWord.norsk}')">Проверить</button>
            `;
            break;
    }
    modal.style.display = 'block';
}

export function closeTrainer() {
    document.getElementById('trainerModal').style.display = 'none';
}

window.checkAnswer = (selected, correct) => {
    const content = document.getElementById('trainerContent');
    content.innerHTML = `<p>${selected === correct ? 'Правильно!' : 'Неправильно, правильный ответ: ' + correct}</p><button onclick="showTrainer('quiz')">Ещё</button>`;
};

window.checkTyping = (correct) => {
    const input = document.getElementById('typingInput').value.trim().toLowerCase();
    const content = document.getElementById('trainerContent');
    content.innerHTML = `<p>${input === correct.toLowerCase() ? 'Правильно!' : 'Неправильно, правильный ответ: ' + correct}</p><button onclick="showTrainer('typing')">Ещё</button>`;
};
