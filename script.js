document.addEventListener('DOMContentLoaded', () => {
    const tracksContainer = document.getElementById('tracks');
    const resetButton = document.getElementById('reset');
    const masterVolume = document.getElementById('master-volume');
    let tracks = [];

    // Встроенные base64-аудиофайлы (короткие фрагменты для примера)
    const audioData = {
        rain: 'data:audio/mpeg;base64,//uQxA...[дождь]...',
        waves: 'data:audio/mpeg;base64,//uQxA...[волны]...',
        wind: 'data:audio/mpeg;base64,//uQxA...[ветер]...',
        fire: 'data:audio/mpeg;base64,//uQxA...[костер]...',
        crickets: 'data:audio/mpeg;base64,//uQxA...[сверчки]...',
        umbrellaRain: 'data:audio/mpeg;base64,//uQxA...[дождь под зонтом]...',
        '432hz': 'data:audio/mpeg;base64,//uQxA...[432 Гц]...',
        '528hz': 'data:audio/mpeg;base64,//uQxA...[528 Гц]...',
        '639hz': 'data:audio/mpeg;base64,//uQxA...[639 Гц]...',
        '741hz': 'data:audio/mpeg;base64,//uQxA...[741 Гц]...',
        '852hz': 'data:audio/mpeg;base64,//uQxA...[852 Гц]...',
        '963hz': 'data:audio/mpeg;base64,//uQxA...[963 Гц]...'
    };

    const categories = {
        nature: [
            { name: 'Шум дождя', src: audioData.rain, volume: 0.5 },
            { name: 'Морские волны', src: audioData.waves, volume: 0.5 },
            { name: 'Ветер', src: audioData.wind, volume: 0.5 },
            { name: 'Костер', src: audioData.fire, volume: 0.5 },
            { name: 'Сверчки', src: audioData.crickets, volume: 0.5 },
            { name: 'Дождь под зонтом', src: audioData.umbrellaRain, volume: 0.5 }
        ],
        healing: [
            { name: '432 Гц', src: audioData['432hz'], volume: 0.5 },
            { name: '528 Гц', src: audioData['528hz'], volume: 0.5 },
            { name: '639 Гц', src: audioData['639hz'], volume: 0.5 },
            { name: '741 Гц', src: audioData['741hz'], volume: 0.5 },
            { name: '852 Гц', src: audioData['852hz'], volume: 0.5 },
            { name: '963 Гц', src: audioData['963hz'], volume: 0.5 }
        ],
        ambient: [
            { name: 'Белый шум', src: audioData.rain, volume: 0.5 },
            { name: 'Глубокий ом', src: audioData['432hz'], volume: 0.5 }
        ],
        asmr: [
            { name: 'Шепот', src: audioData.rain, volume: 0.5 },
            { name: 'Тапки по полу', src: audioData.waves, volume: 0.5 }
        ]
    };

    document.querySelectorAll('.category').forEach(category => {
        category.addEventListener('click', () => {
            const cat = category.getAttribute('data-category');
            loadTracks(categories[cat]);
        });
    });

    function loadTracks(categoryTracks) {
        tracksContainer.innerHTML = '';
        tracks.forEach(t => t.audio.pause());
        tracks = categoryTracks.map(track => {
            const div = document.createElement('div');
            div.className = 'track';
            div.innerHTML = `
                <span class="track-name">${track.name}</span>
                <div class="wave"></div>
                <input type="range" class="volume-slider" min="0" max="1" step="0.01" value="${track.volume}">
            `;
            tracksContainer.appendChild(div);

            const audio = new Audio(track.src);
            audio.loop = true;
            audio.volume = track.volume;

            const volumeSlider = div.querySelector('.volume-slider');
            volumeSlider.addEventListener('input', () => {
                audio.volume = volumeSlider.value;
                track.volume = volumeSlider.value;
            });

            audio.play();
            return { audio, volumeSlider };
        });
    }

    resetButton.addEventListener('click', () => {
        tracks.forEach(t => t.audio.pause());
        tracksContainer.innerHTML = '';
        tracks = [];
    });

    masterVolume.addEventListener('input', () => {
        tracks.forEach(t => t.audio.volume = t.volumeSlider.value * masterVolume.value);
    });
});
