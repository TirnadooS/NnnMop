// Плейлист
const playlist = [
    { title: "Cyber Dreams", artist: "Neon Wave", src: "assets/music/track1.mp3" },
    { title: "Electric Love", artist: "Synth Masters", src: "assets/music/track2.mp3" }
];

const audio = new Audio();
let currentTrack = 0;

// Загрузка плейлиста
function loadPlaylist() {
    const playlistEl = document.getElementById('playlist');
    playlistEl.innerHTML = '';
    
    playlist.forEach((song, index) => {
        const songEl = document.createElement('div');
        songEl.className = 'song';
        songEl.textContent = `${song.title} - ${song.artist}`;
        songEl.onclick = () => playTrack(index);
        playlistEl.appendChild(songEl);
    });
}

// Воспроизведение трека
function playTrack(index) {
    currentTrack = index;
    audio.src = playlist[index].src;
    audio.play();
    document.getElementById('play-btn').innerHTML = '<i class="fas fa-pause"></i>';
}

// Управление
document.getElementById('play-btn').addEventListener('click', () => {
    if (audio.paused) {
        audio.play();
        document.getElementById('play-btn').innerHTML = '<i class="fas fa-pause"></i>';
    } else {
        audio.pause();
        document.getElementById('play-btn').innerHTML = '<i class="fas fa-play"></i>';
    }
});

// Громкость
document.getElementById('volume').addEventListener('input', (e) => {
    audio.volume = e.target.value;
});

// Загружаем плейлист при старте
loadPlaylist();
playTrack(0);
