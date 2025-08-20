import { hash } from './utils.js';
const KEY = 'learned';
export const loadLearned = ()=> new Set(JSON.parse(localStorage.getItem(KEY)||'[]'));
export function saveLearned(set){ localStorage.setItem(KEY, JSON.stringify([...set])); }
export function markLearned(set, row){ set.add(hash(row)); saveLearned(set); }
