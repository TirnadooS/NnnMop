// Звуки
const sounds = [
  { name: "Альфа (8–12 Гц)", file: "https://files.catbox.moe/0trgq9.mp3" },
  { name: "Тета (4–7 Гц)", file: "https://files.catbox.moe/h2zxnn.mp3" },
  { name: "Дельта (0.5–4 Гц)", file: "https://files.catbox.moe/vpsmgm.mp3" },
  { name: "ASMR ветер", file: "https://files.catbox.moe/yzk52z.mp3" },
  { name: "Шум дождя", file: "https://files.catbox.moe/jex64q.mp3" },
  { name: "Звук костра", file: "https://files.catbox.moe/z3u5gc.mp3" }
];

const soundList = document.getElementById("sound-list");

sounds.forEach((sound, index) => {
  const wrapper = document.createElement("div");
  const label = document.createElement("label");
  label.textContent = sound.name;

  const audio = new Audio(sound.file);
  audio.loop = true;

  const slider = document.createElement("input");
  slider.type = "range";
  slider.min = 0;
  slider.max = 1;
  slider.step = 0.01;
  slider.value = 0;
  slider.classList.add("slider");

  slider.addEventListener("input", () => {
    audio.volume = slider.value;
    if (slider.value > 0 && audio.paused) audio.play();
    if (slider.value == 0 && !audio.paused) audio.pause();
  });

  wrapper.appendChild(label);
  wrapper.appendChild(slider);
  soundList.appendChild(wrapper);
});

// Плавающие окна
function makeDraggable(el) {
  let isDown = false, offset = [0, 0];

  el.addEventListener("mousedown", (e) => {
    isDown = true;
    offset = [
      el.offsetLeft - e.clientX,
      el.offsetTop - e.clientY
    ];
  });

  document.addEventListener("mouseup", () => isDown = false);

  document.addEventListener("mousemove", (e) => {
    if (!isDown) return;
    el.style.left = (e.clientX + offset[0]) + 'px';
    el.style.top = (e.clientY + offset[1]) + 'px';
  });
}

makeDraggable(document.getElementById("mixer"));
makeDraggable(document.getElementById("chatbot"));

// Тогглы
document.getElementById("toggle-mixer").onclick = () => {
  const el = document.getElementById("mixer");
  el.style.display = el.style.display === "none" ? "block" : "none";
};

document.getElementById("toggle-chatbot").onclick = () => {
  const el = document.getElementById("chatbot");
  el.style.display = el.style.display === "none" ? "block" : "none";
};

// Чат-бот (заглушка)
const chatLog = document.getElementById("chat-log");
const chatInput = document.getElementById("chat-input");

chatInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    const userMsg = chatInput.value.trim();
    if (!userMsg) return;
    chatLog.innerHTML += `<p><b>Ты:</b> ${userMsg}</p>`;
    chatLog.innerHTML += `<p><b>Zen:</b> Попробуй добавить Тета и шум дождя для глубокого сна 🌧️</p>`;
    chatInput.value = "";
    chatLog.scrollTop = chatLog.scrollHeight;
  }
});
