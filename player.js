// Инициализация аудио
const audio = new Audio();
let currentTrack = 0;
const playlist = [
    'music/track1.mp3',
    'music/track2.mp3'
];

function playTrack(index) {
    currentTrack = index;
    audio.src = playlist[index];
    audio.play();
}

// Кнопки управления
document.getElementById('play-btn').addEventListener('click', () => {
    audio.paused ? audio.play() : audio.pause();
});
