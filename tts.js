export function speak(text) {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'nb-NO'; // Норвежский Bokmål
    utterance.rate = 0.9; // Скорость
    window.speechSynthesis.speak(utterance);
}
