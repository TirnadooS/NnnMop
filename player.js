// Глобальные переменные плеера
let currentTrack = null;
let isPlaying = false;
let audioContext;
let audioElement;
let gainNode;
let analyser;
let tracks = [];

// Инициализация плеера
function initPlayer() {
    audioElement = document.getElementById('audio');
    
    // Создаем AudioContext
    try {
        audioContext = new (window.AudioContext || window.webkitAudioContext)();
        gainNode = audioContext.createGain();
        analyser = audioContext.createAnalyser();
        
        const source = audioContext.createMediaElementSource(audioElement);
        source.connect(gainNode);
        gainNode.connect(analyser);
        analyser.connect(audioContext.destination);
        
        // Настройки анализатора для визуализации
        analyser.fftSize = 256;
    } catch (e) {
        console.error("Web Audio API не поддерживается", e);
    }
    
    // Обработчики событий
    document.querySelector('.btn-play').addEventListener('click', togglePlay);
    document.querySelector('.btn-prev').addEventListener('click', prevTrack);
    document.querySelector('.btn-next').addEventListener('click', nextTrack);
    document.querySelector('.btn-shuffle').addEventListener('click', toggleShuffle);
    document.querySelector('.btn-repeat').addEventListener('click', toggleRepeat);
    document.querySelector('.btn-like').addEventListener('click', toggleLike);
    
    // Обработчик прогресса
    const progressBar = document.querySelector('.progress-bar');
    progressBar.addEventListener('click', seek);
    
    // Обработчик громкости
    const volumeControl = document.querySelector('.volume-control input');
    volumeControl.addEventListener('input', setVolume);
    
    // Обновление времени
    audioElement.addEventListener('timeupdate', updateProgress);
    audioElement.addEventListener('ended', nextTrack);
    
    // Загрузка тестовых треков
    loadTracks();
}

// Загрузка треков
function loadTracks() {
    // В реальном приложении здесь будет запрос к API
    tracks = [
        { id: 1, title: "Neon Dreams", artist: "Cyber Wave", src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3", cover: "assets/images/cover1.jpg", duration: 235 },
        { id: 2, title: "Electric Love", artist: "Synth Masters", src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3", cover: "assets/images/cover2.jpg", duration: 192 },
        { id: 3, title: "Digital Heartbeat", artist: "Future Sound", src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3", cover: "assets/images/cover3.jpg", duration: 210 }
    ];
    
    // Воспроизведение первого трека
    if (tracks.length > 0) {
        playTrack(tracks[0].id);
    }
}

// Воспроизведение трека по ID
function playTrack(trackId) {
    const track = tracks.find(t => t.id === trackId);
    if (!track) return;
    
    currentTrack = track;
    audioElement.src = track.src;
    
    // Обновление UI
    document.querySelector('.track-title').textContent = track.title;
    document.querySelector('.track-artist').textContent = track.artist;
    document.querySelector('.track-info img').src = track.cover;
    document.querySelector('.time-total').textContent = formatTime(track.duration);
    
    // Воспроизведение
    audioElement.play()
        .then(() => {
            isPlaying = true;
            document.querySelector('.btn-play i').className = 'fas fa-pause';
        })
        .catch(e => console.error("Ошибка воспроизведения:", e));
}

// Переключение воспроизведения/паузы
function togglePlay() {
    if (isPlaying) {
        audioElement.pause();
        document.querySelector('.btn-play i').className = 'fas fa-play';
    } else {
        audioElement.play()
            .then(() => {
                document.querySelector('.btn-play i').className = 'fas fa-pause';
            })
            .catch(e => console.error("Ошибка воспроизведения:", e));
    }
    isPlaying = !isPlaying;
}

// Следующий трек
function nextTrack() {
    if (!currentTrack || tracks.length === 0) return;
    
    const currentIndex = tracks.findIndex(t => t.id === currentTrack.id);
    const nextIndex = (currentIndex + 1) % tracks.length;
    playTrack(tracks[nextIndex].id);
}

// Предыдущий трек
function prevTrack() {
    if (!currentTrack || tracks.length === 0) return;
    
    const currentIndex = tracks.findIndex(t => t.id === currentTrack.id);
    const prevIndex = (currentIndex - 1 + tracks.length) % tracks.length;
    playTrack(tracks[prevIndex].id);
}

// Перемотка
function seek(e) {
    if (!audioElement.duration) return;
    
    const progressBar = e.currentTarget;
    const clickPosition = e.clientX - progressBar.getBoundingClientRect().left;
    const progressBarWidth = progressBar.offsetWidth;
    const seekTime = (clickPosition / progressBarWidth) * audioElement.duration;
    
    audioElement.currentTime = seekTime;
}

// Установка громкости
function setVolume(e) {
    const volume = e.target.value;
    audioElement.volume = volume;
    gainNode.gain.value = volume;
}

// Обновление прогресса
function updateProgress() {
    const progress = (audioElement.currentTime / audioElement.duration) * 100;
    document.querySelector('.progress').style.width = `${progress}%`;
    document.querySelector('.time-current').textContent = formatTime(audioElement.currentTime);
}

// Форматирование времени
function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
}

// Переключение shuffle
function toggleShuffle() {
    const btn = document.querySelector('.btn-shuffle');
    btn.classList.toggle('active');
    // Логика перемешивания плейлиста
}

// Переключение repeat
function toggleRepeat() {
    const btn = document.querySelector('.btn-repeat');
    btn.classList.toggle('active');
    audioElement.loop = !audioElement.loop;
}

// Переключение лайка
function toggleLike() {
    const btn = document.querySelector('.btn-like');
    btn.classList.toggle('far');
    btn.classList.toggle('fas');
    btn.style.color = btn.classList.contains('fas') ? '#1db954' : '';
}
