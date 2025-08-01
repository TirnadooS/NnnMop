document.addEventListener('DOMContentLoaded', function() {
    const sliders = document.querySelectorAll('.volume-slider');
    const playAllBtn = document.getElementById('play-all');
    const stopAllBtn = document.getElementById('stop-all');
    const audioElements = document.querySelectorAll('audio');
    
    // Регулировка громкости
    sliders.forEach((slider, index) => {
        slider.addEventListener('input', function() {
            audioElements[index].volume = this.value / 100;
        });
    });
    
    // Включить все звуки
    playAllBtn.addEventListener('click', function() {
        audioElements.forEach(audio => {
            audio.play();
        });
    });
    
    // Остановить все
    stopAllBtn.addEventListener('click', function() {
        audioElements.forEach(audio => {
            audio.pause();
            audio.currentTime = 0;
        });
    });
});
