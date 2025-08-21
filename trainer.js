function initTrainer() {
  const container = document.getElementById("trainer");
  container.addEventListener("click", e => {
    if(e.target.tagName === "DIV") speak(e.target.textContent.split(' — ')[0]);
  });
}
