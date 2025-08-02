document.addEventListener('DOMContentLoaded', () => {
    const soundGrid = document.getElementById('sound-grid');
    const mixer = document.getElementById('mixer');
    const aiAssist = document.getElementById('ai-assist');
    const slots = document.getElementById('slots');
    let tracks = [];
    let favorites = JSON.parse(localStorage.getItem('favorites')) || {};

    // Встроенные base64-аудиофайлы (короткие фрагменты)
    const audioData = {
        '432hz': 'data:audio/mpeg;base64,//uQxA...[432 Гц]...',
        '528hz': 'data:audio/mpeg;base64,//uQxA...[528 Гц]...',
        '639hz': 'data:audio/mpeg;base64,//uQxA...[639 Гц]...',
        '741hz': 'data:audio/mpeg;base64,//uQxA...[741 Гц]...',
        '852hz': 'data:audio/mpeg;base64,//uQxA...[852 Гц]...',
        '936hz': 'data:audio/mpeg;base64,//uQxA...[936 Гц]...',
        rain: 'data:audio/mpeg;base64,//uQxA...[дождь]...',
        wind: 'data:audio/mpeg;base64,//uQxA...[ветер]...',
        fire: 'data:audio/mpeg;base64,//uQxA...[огонь]...',
        forest: 'data:audio/mpeg;base64,//uQxA...[лес]...',
        waterfall: 'data:audio/mpeg;base64,//uQxA...[водопад]...',
        river: 'data:audio/mpeg;base64,//uQxA...[река]...',
    };

    const sounds = [
        { name: '432 Гц', src: audioData['432hz'] },
        { name: '528 Гц', src: audioData['528hz'] },
        { name: '639 Гц', src: audioData['639hz'] },
        { name: '741 Гц', src: audioData['741hz'] },
        { name: '852 Гц', src: audioData['852hz'] },
        { name: '936 Гц', src: audioData['936hz'] },
        { name: 'Дождь', src: audioData.rain },
        { name: 'Ветер', src: audioData.wind },
        { name: 'Огонь', src: audioData.fire },
        { name: 'Лес', src: audioData.forest },
        { name: 'Водопад', src: audioData.waterfall },
        { name: 'Река', src: audioData.river },
        { name: '', src: '' }, // Заглушки для 4x4
        { name: '', src: '' },
        { name: '', src: '' },
        { name: '', src: '' }
    ];

    sounds.forEach(sound => {
        const btn = document.createElement('button');
        btn.className = 'sound-btn';
        btn.textContent = sound.name || 'Пусто';
        btn.addEventListener('click', () => toggleSound(sound));
        soundGrid.appendChild(btn);
    });

    function toggleSound(sound) {
        if (!sound.src) return;
        const existing = tracks.find(t => t.sound === sound);
        if (existing) {
            existing.audio.pause();
            tracks = tracks.filter(t => t !== existing);
        } else {
            const audio = new Audio(sound.src);
            audio.loop = true;
            audio.volume = 0.5;
            audio.play();
            tracks.push({ sound, audio, volume: 0.5 });
        }
    }

    document.getElementById('master-volume').addEventListener('input', (e) => {
        tracks.forEach(t => t.audio.volume = t.volume * e.target.value);
    });

    aiAssist.addEventListener('click', () => {
        tracks.forEach(t => t.audio.pause());
        tracks = [];
        const randomSounds = sounds.filter(s => s.src).sort(() => Math.random() - 0.5).slice(0, 3);
        randomSounds.forEach(s => toggleSound(s));
    });

    slots.querySelectorAll('.slot').forEach(slot => {
        const input = slot.querySelector('input');
        const saveBtn = slot.querySelector('.save-btn');
        const slotId = slot.getAttribute('data-slot');

        if (favorites[slotId]) {
            input.value = favorites[slotId].name;
        }

        saveBtn.addEventListener('click', () => {
            const name = input.value.trim();
            if (name && tracks.length) {
                favorites[slotId] = { name, mix: tracks.map(t => t.sound.name) };
                localStorage.setItem('favorites', JSON.stringify(favorites));
                alert(`Микс "${name}" сохранен в слот ${slotId}!`);
            }
        });
    });
});
