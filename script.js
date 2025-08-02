document.addEventListener('DOMContentLoaded', () => {
    const soundButtons = document.querySelectorAll('.sound-btn');
    const playPauseButton = document.getElementById('play-pause');
    const volumeControl = document.getElementById('volume');
    let currentAudio = null;
    let isPlaying = false;

    const sounds = {
        rain: 'sounds/rain.mp3',
        waves: 'sounds/waves.mp3',
        'white-noise': 'sounds/white-noise.mp3'
    };

    soundButtons.forEach(button => {
        button.addEventListener('click', () => {
            const soundKey = button.getAttribute('data-sound');
            soundButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            if (currentAudio) {
                currentAudio.pause();
                currentAudio.currentTime = 0;
            }

            currentAudio = new Audio(sounds[soundKey]);
            currentAudio.loop = true;
            currentAudio.volume = volumeControl.value;

            if (isPlaying) {
                currentAudio.play();
                playPauseButton.textContent = 'Пауза';
            }
        });
    });

    playPauseButton.addEventListener('click', () => {
        if (!currentAudio) return;

        if (isPlaying) {
            currentAudio.pause();
            playPauseButton.textContent = 'Воспроизвести';
        } else {
            currentAudio.play();
            playPauseButton.textContent = 'Пауза';
        }
        isPlaying = !isPlaying;
    });

    volumeControl.addEventListener('input', () => {
        if (currentAudio) {
            currentAudio.volume = volumeControl.value;
        }
    });
});
