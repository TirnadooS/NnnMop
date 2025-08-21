self.addEventListener('install', e => {
  e.waitUntil(
    caches.open('norwegian-trainer-v1').then(cache => {
      return cache.addAll([
        '/',
        '/index.html',
        '/styles.css',
        '/app.js',
        '/utils.js',
        '/storage.js',
        '/data.js',
        '/tts.js',
        '/trainer.js'
      ]);
    })
  );
});
self.addEventListener('fetch', e => {
  e.respondWith(caches.match(e.request).then(r => r || fetch(e.request)));
});
