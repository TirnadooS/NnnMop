// data.js — загрузчик JSON-пакетов и экспорт данных
export async function loadA1() {
  const res = await fetch('data/a1.json');
  if (!res.ok) throw new Error('Failed to load a1.json');
  const data = await res.json();
  return data; // массив объектов {no, trans, ru}
}

export async function loadAll() {
  // в будущем можно грузить A2/B1/B2
  return { a1: await loadA1() };
}
