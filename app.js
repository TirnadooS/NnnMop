import { $, $$, escapeHtml } from './utils.js';
import { loadPacks, BASE_DATA } from './data.js';
import { loadLearned, saveLearned } from './storage.js';
import { speakNo } from './tts.js';
import { setupTrainers } from './trainer.js';

const state = {
  data: [],
  filtered: [],
  search: '', level: '', topic: '', onlyNew: false,
  learned: loadLearned(),
  updateProgress(){ const total=this.data.length; $('#progress').textContent = `${this.learned.size}/${total}`; }
};

const tableBody = $('#tableBody');
const levelFilter = $('#levelFilter');
const topicFilter = $('#topicFilter');
const onlyNew = $('#onlyNew');
const search = $('#search');

init();

async function init(){
  // Загрузка данных: JSON‑пакеты + базовый набор как fallback
  let extra = [];
  try { extra = await loadPacks(); } catch(e){ extra = []; }
  state.data = [...BASE_DATA, ...extra];

  // Заполнение списков тем
  const topics = Array.from(new Set(state.data.map(x=>x.topic))).sort();
  topics.forEach(tp=>{
    const opt = document.createElement('option'); opt.value = tp; opt.textContent = tp; topicFilter.appendChild(opt);
    const btn = document.createElement('button'); btn.textContent=tp; btn.dataset.topic=tp;
    btn.onclick = ()=>{ state.topic = (state.topic===tp?'':tp); applyFilters(); render(); markActiveTopic(); };
    $('#topics').appendChild(btn);
  });

  // Фильтры/поиск
  levelFilter.onchange = ()=>{state.level=levelFilter.value; applyFilters(); render();};
  topicFilter.onchange = ()=>{state.topic=topicFilter.value; markActiveTopic(); applyFilters(); render();};
  onlyNew.onchange = ()=>{state.onlyNew=onlyNew.checked; applyFilters(); render();};
  search.oninput = ()=>{state.search=search.value; applyFilters(); render();};

  // Клики в таблице
  document.addEventListener('click', (e)=>{
    const sayBtn = e.target.closest('[data-say]');
    if(sayBtn){ const row = state.filtered[Number(sayBtn.dataset.say)]; speakNo(row.n); }
    const learnChk = e.target.closest('[data-learn]');
    if(learnChk){ const row = state.filtered[Number(learnChk.dataset.learn)];
      const key = `${row.n}|${row.t}|${row.lvl}|${row.topic}`;
      if(learnChk.checked) state.learned.add(key); else state.learned.delete(key);
      saveLearned(state.learned); state.updateProgress();
    }
  });

  // Тема/печать
  $('#themeToggle').onclick = ()=> document.documentElement.classList.toggle('light');
  $('#printBtn').onclick = ()=> window.open('print.html', '_blank');

  // SW
  if('serviceWorker' in navigator){ navigator.serviceWorker.register('sw.js').catch(()=>{}); }

  setupTrainers(state);
  applyFilters(); render(); state.updateProgress();
}

function markActiveTopic(){ $$('#topics button').forEach(b=> b.classList.toggle('active', b.dataset.topic===state.topic && state.topic)); }

function applyFilters(){
  const q = state.search.trim().toLowerCase();
  state.filtered = state.data.filter(x=>{
    if(state.level && x.lvl!==state.level) return false;
    if(state.topic && x.topic!==state.topic) return false;
    if(state.onlyNew && state.learned.has(`${x.n}|${x.t}|${x.lvl}|${x.topic}`)) return false;
    if(!q) return true;
    return [x.n, x.r||'', x.t].some(v=> v.toLowerCase().includes(q));
  });
}

function render(){
  tableBody.innerHTML = '';
  state.filtered.forEach((row, idx)=>{
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td><strong>${escapeHtml(row.n)}</strong></td>
      <td>${escapeHtml(row.r||'')}</td>
      <td>${escapeHtml(row.t)}</td>
      <td><span class="chip">${row.lvl}</span></td>
      <td><small>${escapeHtml(row.topic)}</small></td>
      <td class="no-print"><button class="btn ghost" data-say="${idx}">🔊</button></td>
      <td class="no-print"><input type="checkbox" ${state.learned.has(`${row.n}|${row.t}|${row.lvl}|${row.topic}`)?'checked':''} data-learn="${idx}"/></td>`;
    tableBody.appendChild(tr);
  });
}
