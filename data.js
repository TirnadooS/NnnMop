// Базовый набор (минимум, чтобы всё работало офлайн). Можно расширять JSON‑файлами ниже.
export const BASE_DATA = [
  {n:'Hei', r:'хэй', t:'Привет', lvl:'A1', topic:'Приветствия'},
  {n:'God morgen', r:'гу морген', t:'Доброе утро', lvl:'A1', topic:'Приветствия'},
  {n:'Takk', r:'так', t:'Спасибо', lvl:'A1', topic:'Приветствия'},
  {n:'Vann', r:'ванн', t:'Вода', lvl:'A1', topic:'Еда и напитки'},
  {n:'Brød', r:'брё', t:'Хлеб', lvl:'A1', topic:'Еда и напитки'},
  {n:'å være', r:'о вэрэ', t:'быть', lvl:'A1', topic:'Глаголы'},
  {n:'å ha', r:'о ха', t:'иметь', lvl:'A1', topic:'Глаголы'},
  {n:'arbeid', r:'арбейд', t:'работа', lvl:'B1', topic:'Работа'}
];

// Динамическая загрузка пакетов уровней (работает на GitHub Pages)
export async function loadPacks(){
  const packs = ['data/a1.json','data/a2.json','data/b1.json','data/b2.json'];
  const loaded = await Promise.all(packs.map(p=> fetch(p).then(r=> r.ok? r.json(): []).catch(()=>[])));
  return loaded.flat();
}
