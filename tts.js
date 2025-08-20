export function speakNo(text){
  if(!('speechSynthesis' in window)){
    alert('Озвучка не поддерживается в этом браузере');
    return;
  }
  const u = new SpeechSynthesisUtterance(text);
  u.lang = 'no-NO';
  u.rate = 0.95;
  speechSynthesis.cancel();
  speechSynthesis.speak(u);
}
