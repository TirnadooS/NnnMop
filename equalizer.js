// Инициализация эквалайзера
function initEqualizer() {
    const eqModal = document.getElementById('equalizer-modal');
    const eqBtn = document.querySelector('.btn-equalizer');
    const closeBtn = document.querySelector('.btn-close-eq');
    const presetBtns = document.querySelectorAll('.preset-btn');
    const bands = document.querySelectorAll('.equalizer-bands input');
    
    // Открытие/закрытие модального окна
    eqBtn.addEventListener('click', () => {
        eqModal.classList.add('active');
    });
    
    closeBtn.addEventListener('click', () => {
        eqModal.classList.remove('active');
    });
    
    // Применение пресетов
    presetBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const preset = btn.dataset.preset;
            applyPreset(preset);
        });
    });
    
    // Обработка изменений полос эквалайзера
    bands.forEach(band => {
        band.addEventListener('input', updateEqualizer);
    });
}

// Применение пресета
function applyPreset(preset) {
    const bands = document.querySelectorAll('.equalizer-bands input');
    const presets = {
        flat: [0, 0, 0, 0, 0, 0, 0],
        pop: [4, 2, -2, -1, 1, 3, 2],
        rock: [6, 3, -1, 2, 3, 2, 1],
        jazz: [3, 2, 0, -2, -1, 1, 3],
        classical: [-1, -1, -1, 0, 2, 4, 6]
    };
    
    const values = presets[preset] || presets.flat;
    
    bands.forEach((band, index) => {
        band.value = values[index];
    });
    
    updateEqualizer();
}

// Обновление эквалайзера
function updateEqualizer() {
    if (!audioContext) return;
    
    const bands = document.querySelectorAll('.equalizer-bands input');
    const values = Array.from(bands).map(b => parseInt(b.value));
    
    // В реальном приложении здесь будет обработка через BiquadFilterNode
    console.log("Настройки эквалайзера:", values);
}
