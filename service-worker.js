const cacheName = "neoDict-v1";
const filesToCache = [
  "/",
  "/index.html",
  "/style.css",
  "/app.js",
  "/re.jpg",
  "/manifest.json"
];

// Install service worker
self.addEventListener("install", (e) => {
  e.waitUntil(
    caches.open(cacheName).then((cache) => {
      return cache.addAll(filesToCache);
    })
  );
});

// Fetch files
self.addEventListener("fetch", (e) => {
  e.respondWith(
    caches.match(e.request).then((response) => {
      return response || fetch(e.request);
    })
  );
});
