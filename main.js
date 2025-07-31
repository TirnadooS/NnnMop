// Инициализация приложения
document.addEventListener('DOMContentLoaded', function() {
    // Загрузка тестовых данных
    loadTracks();
    
    // Инициализация плеера
    initPlayer();
    
    // Инициализация AI ассистента
    initAI();
    
    // Инициализация эквалайзера
    initEqualizer();
});

// Загрузка треков
function loadTracks() {
    const tracksGrid = document.querySelector('.tracks-grid');
    const tracksList = document.querySelector('.tracks-list');
    
    // Пример данных (в реальном приложении будет запрос к API)
    const featuredTracks = [
        { id: 1, title: "Neon Dreams", artist: "Cyber Wave", cover: "assets/images/cover1.jpg" },
        { id: 2, title: "Electric Love", artist: "Synth Masters", cover: "assets/images/cover2.jpg" },
        { id: 3, title: "Digital Heartbeat", artist: "Future Sound", cover: "assets/images/cover3.jpg" },
        { id: 4, title: "Tokyo Night", artist: "Retro Future", cover: "assets/images/cover4.jpg" },
        { id: 5, title: "Hologram", artist: "Neon Dreams", cover: "assets/images/cover5.jpg" },
        { id: 6, title: "Virtual Reality", artist: "Digital Ghost", cover: "assets/images/cover6.jpg" }
    ];
    
    const recentTracks = [
        { id: 7, title: "Cyberpunk 2077", artist: "Retro Wave", duration: "3:45" },
        { id: 8, title: "Neon Rain", artist: "Synth Rider", duration: "4:12" },
        { id: 9, title: "Electric Pulse", artist: "Future Club", duration: "3:28" }
    ];
    
    // Очистка перед загрузкой
    tracksGrid.innerHTML = '';
    tracksList.innerHTML = '';
    
    // Добавление рекомендуемых треков
    featuredTracks.forEach(track => {
        const trackCard = document.createElement('div');
        trackCard.className = 'track-card';
        trackCard.innerHTML = `
            <img src="${track.cover}" alt="${track.title}">
            <h4>${track.title}</h4>
            <p>${track.artist}</p>
        `;
        trackCard.addEventListener('click', () => playTrack(track.id));
        tracksGrid.appendChild(trackCard);
    });
    
    // Добавление недавних треков
    recentTracks.forEach(track => {
        const trackRow = document.createElement('div');
        trackRow.className = 'track-row';
        trackRow.innerHTML = `
            <img src="assets/images/default-cover.jpg" alt="${track.title}">
            <div class="track-info">
                <h4>${track.title}</h4>
                <p>${track.artist}</p>
            </div>
            <div class="track-duration">${track.duration}</div>
        `;
        trackRow.addEventListener('click', () => playTrack(track.id));
        tracksList.appendChild(trackRow);
    });
}

// Инициализация плеера
function initPlayer() {
    // Реализация в player.js
}

// Инициализация AI ассистента
function initAI() {
    // Реализация в ai.js
}

// Инициализация эквалайзера
function initEqualizer() {
    // Реализация в equalizer.js
}
