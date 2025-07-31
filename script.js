const sounds = {
  alpha: new Audio("https://zen-audio.s3.amazonaws.com/alpha.mp3"),
  theta: new Audio("https://zen-audio.s3.amazonaws.com/theta.mp3"),
  delta: new Audio("https://zen-audio.s3.amazonaws.com/delta.mp3"),
  rain: new Audio("https://zen-audio.s3.amazonaws.com/rain.mp3"),
  space: new Audio("https://zen-audio.s3.amazonaws.com/space.mp3")
};

for (let key in sounds) {
  sounds[key].loop = true;
  sounds[key].volume = 0.5;
  sounds[key].play();
}

document.querySelectorAll('.track').forEach(track => {
  const soundKey = track.dataset.sound;
  const range = track.querySelector('input');
  range.addEventListener('input', () => {
    sounds[soundKey].volume = parseFloat(range.value);
  });
});

// Плавающие окна
document.querySelectorAll(".draggable").forEach(el => {
  el.onmousedown = function (e) {
    let offsetX = e.clientX - el.offsetLeft;
    let offsetY = e.clientY - el.offsetTop;
    function mouseMoveHandler(e) {
      el.style.left = `${e.clientX - offsetX}px`;
      el.style.top = `${e.clientY - offsetY}px`;
    }
    function mouseUpHandler() {
      document.removeEventListener('mousemove', mouseMoveHandler);
      document.removeEventListener('mouseup', mouseUpHandler);
    }
    document.addEventListener('mousemove', mouseMoveHandler);
    document.addEventListener('mouseup', mouseUpHandler);
  };
});
