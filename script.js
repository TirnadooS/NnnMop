const sounds = {
  '528hz': new Audio('https://cdn.pixabay.com/download/audio/2021/11/03/audio_123.mp3'),
  '396hz': new Audio('https://cdn.pixabay.com/download/audio/2022/03/11/audio_456.mp3'),
  'rain': new Audio('https://cdn.pixabay.com/download/audio/2021/10/29/audio_789.mp3'),
  'wind': new Audio('https://cdn.pixabay.com/download/audio/2022/01/17/audio_321.mp3'),
  'fire': new Audio('https://cdn.pixabay.com/download/audio/2021/09/01/audio_654.mp3'),
};

function playSound(name) {
  if (sounds[name]) {
    sounds[name].loop = true;
    sounds[name].volume = 0.5;
    sounds[name].play();
  }
}

// Перетаскивание окон
document.querySelectorAll('.draggable').forEach(el => {
  const bar = el.querySelector('.title-bar');
  bar.addEventListener('mousedown', dragMouseDown);

  function dragMouseDown(e) {
    e.preventDefault();
    let pos3 = e.clientX;
    let pos4 = e.clientY;

    document.onmouseup = closeDrag;
    document.onmousemove = drag;

    function drag(e) {
      e.preventDefault();
      let pos1 = pos3 - e.clientX;
      let pos2 = pos4 - e.clientY;
      pos3 = e.clientX;
      pos4 = e.clientY;

      el.style.top = (el.offsetTop - pos2) + "px";
      el.style.left = (el.offsetLeft - pos1) + "px";
    }

    function closeDrag() {
      document.onmouseup = null;
      document.onmousemove = null;
    }
  }
});
