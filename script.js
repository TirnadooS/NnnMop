export const $ = (sel, el=document)=> el.querySelector(sel);
export const $$ = (sel, el=document)=> Array.from(el.querySelectorAll(sel));
export const escapeHtml = (s)=> s.replace(/[&<>"']/g, m=>({"&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;","'":"&#39;"}[m]));
export const hash = (o)=> `${o.n}|${o.t}|${o.lvl}|${o.topic}`;

// Грубая транслитерация Norsk -> рус. подсказка (для авто‑генерации, если r не задана)
export function translitNorsk(s){
  let x = ' '+s.toLowerCase()+' ';
  // Порядок важен: длинные сочетания раньше
  x = x.replace(/skj|sjø|sje/g, 'шь');
  x = x.replace(/kj/g, 'хь');
  x = x.replace(/sj/g, 'ш');
  x = x.replace(/sy/g, 'сью');
  x = x.replace(/ky/g, 'кью');
  x = x.replace(/øy/g, 'ёй');
  x = x.replace(/ei/g, 'эй');
  x = x.replace(/au/g, 'ау');
  x = x.replace(/å/g, 'о');
  x = x.replace(/æ/g, 'э');
  x = x.replace(/ø/g, 'ё');
  x = x.replace(/y/g, 'ю');
  x = x.replace(/c/g, 'к');
  x = x.replace(/q/g, 'к');
  x = x.replace(/w/g, 'в');
  x = x.replace(/z/g, 'с');
  x = x.replace(/[^a-zæøå ]/g,'');
  return x.trim().replace(/ +/g,' ');
}
