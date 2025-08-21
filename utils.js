function transliterate(word) {
  // простая транслитерация для норвежского
  return word.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

function renderWords(words) {
  const container = document.getElementById("trainer");
  container.innerHTML = "";
  words.forEach(w => {
    const div = document.createElement("div");
    div.textContent = `${w.no} — ${w.ru}`;
    container.appendChild(div);
  });
}
