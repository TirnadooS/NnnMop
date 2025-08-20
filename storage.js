export function loadProgress() {
    const saved = localStorage.getItem('learnedWords');
    if (saved) {
        const learned = JSON.parse(saved);
        learned.forEach(word => {
            const checkbox = document.querySelector(`input[data-word="${word}"]`);
            if (checkbox) checkbox.checked = true;
        });
    }
}

export function saveProgress() {
    const learned = Array.from(document.querySelectorAll('input[type="checkbox"]:checked'))
        .map(cb => cb.dataset.word);
    localStorage.setItem('learnedWords', JSON.stringify(learned));
}

export function exportToPDF() {
    window.print(); // Использует print.html и print.css
}
