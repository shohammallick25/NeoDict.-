const CACHE_NAME = 'neodict-cache-v1';
const urlsToCache = [
  './',
  './index.html',
  './style.css',
  './app.js',
  './re.jpg',
  './manifest.json'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(resp => resp || fetch(event.request))
  );
});
