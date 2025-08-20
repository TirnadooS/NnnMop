import { $, $$ } from './utils.js';
import { markLearned } from './storage.js';
import { speakNo } from './tts.js';

export function setupTrainers(state){
  const trainer = $('#trainerModal');
  const trainerTitle = $('#trainerTitle');
  const trainerContent = $('#trainerContent');
  $('#flashcardsBtn').addEventListener('click', ()=> startFlashcards());
  $('#quizBtn').addEventListener('click', ()=> startQuiz());
  $('#typingBtn').addEventListener('click', ()=> startTyping());
  $('#nextTask').addEventListener('click', (e)=>{ e.preventDefault(); nextTask && nextTask(); });

  let queue = [], pos = 0, nextTask = null;

  function pickSet(size=10){
    const src = state.filtered.length? state.filtered: state.data;
    const shuffled = [...src].sort(()=>Math.random()-0.5);
    return shuffled.slice(0, Math.min(size, shuffled.length));
  }
  function openModal(title){ trainerTitle.textContent = title; trainer.showModal(); }

  function startFlashcards(){ queue = pickSet(12); pos = 0; openModal('Карточки'); renderCard(); nextTask = ()=>{ pos=(pos+1)%queue.length; renderCard(); }; }
  function renderCard(){
    const w = queue[pos];
    trainerContent.innerHTML = `
      <div class="fc">
        <div class="q">${w.n}</div>
        <button class="btn ghost" id="reveal">Показать перевод</button>
        <div class="a" id="answer" hidden>${w.r||''} — ${w.t}</div>
        <div class="row">
          <button class="btn" id="know">Знаю ✓</button>
          <button class="btn ghost" id="say">🔊</button>
        </div>
      </div>`;
    $('#reveal').onclick = ()=> $('#answer').hidden=false;
    $('#know').onclick = ()=>{ markLearned(state.learned, w); state.updateProgress(); };
    $('#say').onclick = ()=> speakNo(w.n);
  }

  function startQuiz(){ queue = pickSet(8); pos = 0; openModal('Тест'); renderQuiz(); nextTask = ()=>{ pos=(pos+1)%queue.length; renderQuiz(); }; }
  function renderQuiz(){
    const w = queue[pos];
    const pool = [...state.data].sort(()=>Math.random()-0.5);
    const opts = [w, ...pool.filter(o=>o!==w).slice(0,3)].sort(()=>Math.random()-0.5);
    trainerContent.innerHTML = `
      <div class="quiz">
        <div class="q">Что означает: <strong>${w.n}</strong>?</div>
        <div class="opts">${opts.map((o,i)=>`<button class=\"btn ghost\" data-i=\"${i}\">${o.t}</button>`).join('')}</div>
        <div id="qMsg"></div>
      </div>`;
    $$('.opts .btn', trainerContent).forEach((b,i)=> b.onclick = ()=>{
      const ok = opts[i]===w; $('#qMsg').textContent = ok? 'Верно!': `Неверно. Правильно: ${w.t}`;
      if(ok){ markLearned(state.learned, w); state.updateProgress(); }
    });
  }

  function startTyping(){ queue = pickSet(8); pos = 0; openModal('Диктант'); renderTyping(); nextTask = ()=>{ pos=(pos+1)%queue.length; renderTyping(); }; }
  function renderTyping(){
    const w = queue[pos];
    trainerContent.innerHTML = `
      <div class="type">
        <div class="row"><button class="btn" id="say">🔊 Произнести</button></div>
        <label>Введите слово на норвежском:
          <input id="typeIn" class="search" autocomplete="off" placeholder="Например: ${w.n}" />
        </label>
        <div class="row"><button class="btn" id="check">Проверить</button>
        <span id="typeMsg"></span></div>
      </div>`;
    $('#say').onclick = ()=> speakNo(w.n);
    $('#check').onclick = ()=>{
      const val = ($('#typeIn').value||'').trim();
      const ok = val.toLowerCase() === w.n.toLowerCase();
      $('#typeMsg').textContent = ok? 'Правильно! ✓' : `Нужно: ${w.n}`;
      if(ok){ markLearned(state.learned, w); state.updateProgress(); }
    };
  }
}
