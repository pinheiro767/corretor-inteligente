const CACHE_NAME = "corretor-inteligente-v1";

const ARQUIVOS = [
  "/",
  "/index.html",
  "/style.css",
  "/app.js",
  "/banco.js",
  "/manifest.json"
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ARQUIVOS))
  );
});

self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(resposta => {
      return resposta || fetch(event.request);
    })
  );
});