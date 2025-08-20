const CACHE = 'norsk-1.1.0';
const ASSETS = [
  './','./index.html','./styles.css','./utils.js','./storage.js','./tts.js','./trainer.js','./app.js','./data.js',
  './print.html','./print.css','./pages/grammar.html','./pages/verbs.html',
  './data/a1.json','./data/a2.json','./data/b1.json','./data/b2.json',
  './assets/logo.svg','./assets/icons/192.png','./assets/icons/512.png'
];
self.addEventListener('install', e=>{ e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS))); });
self.addEventListener('activate', e=>{ e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k))))); });
self.addEventListener('fetch', e=>{ e.respondWith(caches.match(e.request).then(r=> r || fetch(e.request))); });
