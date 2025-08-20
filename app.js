import { words } from './data.js';
import { initializeTrainer, showTrainer, closeTrainer } from './trainer.js';
import { speak } from './tts.js';
import { loadProgress, saveProgress, exportToPDF } from './storage.js';

document.addEventListener('DOMContentLoaded', () => {
    const vocabularyBody = document.getElementById('vocabularyBody');
    const levelFilter = document.getElementById('levelFilter');
    const themeFilter = document.getElementById('themeFilter');
    const progressElement = document.getElementById('progress');

    function renderTable(filteredWords) {
        vocabularyBody.innerHTML = '';
        filteredWords.forEach(word => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${word.norsk}</td>
                <td>${word.transcription}</td>
                <td>${word.translation}</td>
                <td>${word.level}</td>
                <td>${word.theme}</td>
                <td><span class="audio" onclick="speak('${word.norsk}')">🔊</span></td>
                <td><input type="checkbox" onchange="saveProgress()" data-word="${word.norsk}"></td>
            `;
            vocabularyBody.appendChild(row);
        });
        updateProgress();
    }

    function filterWords() {
        const level = levelFilter.value;
        const theme = themeFilter.value;
        let filtered = words;
        if (level !== 'all') filtered = filtered.filter(w => w.level === level);
        if (theme !== 'all') filtered = filtered.filter(w => w.theme === theme);
        renderTable(filtered);
    }

    function updateProgress() {
        const learned = document.querySelectorAll('input[type="checkbox"]:checked').length;
        const total = words.length;
        const percentage = total ? (learned / total * 100).toFixed(1) : 0;
        progressElement.textContent = `${percentage}%`;
    }

    levelFilter.addEventListener('change', filterWords);
    themeFilter.addEventListener('change', filterWords);

    loadProgress();
    renderTable(words);
    initializeTrainer();
    window.speak = speak;
    window.exportToPDF = exportToPDF;
    window.closeTrainer = closeTrainer;
});
