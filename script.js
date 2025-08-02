document.addEventListener('DOMContentLoaded', () => {
    const tracksContainer = document.getElementById('tracks');
    const aiMixButton = document.getElementById('ai-mix');
    const masterVolume = document.getElementById('master-volume');
    let tracks = [];

    const categories = {
        nature: [
            { name: 'Шум дождя', src: 'sounds/rain-432hz.mp3', volume: 0.5 },
            { name: 'Морские волны', src: 'sounds/waves-528hz.mp3', volume: 0.5 }
        ],
        healing: [
            { name: '432 Гц', src: 'sounds/432hz.mp3', volume: 0.5 },
            { name: '528 Гц', src: 'sounds/528hz.mp3', volume: 0.5 }
        ],
        ambient: [
            { name: 'Белый шум', src: 'sounds/white-noise.mp3', volume: 0.5 },
            { name: 'Глубокий ом', src: 'sounds/om-432hz.mp3', volume: 0.5 }
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

            return { audio, volumeSlider };
        });
    }

    aiMixButton.addEventListener('click', () => {
        tracks.forEach(t => t.audio.pause());
        tracksContainer.innerHTML = '';
        const randomTracks = [];
        for (let cat in categories) {
            const track = categories[cat][Math.floor(Math.random() * categories[cat].length)];
            randomTracks.push({ ...track, volume: 0.3 + Math.random() * 0.5 });
        }
        loadTracks(randomTracks);
        randomTracks.forEach(t => t.audio.play());
    });

    masterVolume.addEventListener('input', () => {
        tracks.forEach(t => t.audio.volume = t.volumeSlider.value * masterVolume.value);
    });
});
