const CACHE_NAME = "clinical-order-calculator-20260630-pwa1";
const APP_SHELL = [
  "/",
  "/index.html",
  "/styles.css?v=20260630-pwa1",
  "/app.js?v=20260630-pwa1",
  "/manifest.webmanifest?v=20260630-pwa1",
  "/icon.svg?v=20260630-pwa1",
  "/icon-192.png?v=20260630-pwa1",
  "/icon-512.png?v=20260630-pwa1",
  "/apple-touch-icon.png?v=20260630-pwa1"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => cache.addAll(APP_SHELL))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) => Promise.all(keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (event) => {
  const request = event.request;
  const url = new URL(request.url);

  if (request.method !== "GET" || url.origin !== self.location.origin) return;

  event.respondWith(
    fetch(request)
      .then((response) => {
        const copy = response.clone();
        caches.open(CACHE_NAME).then((cache) => cache.put(request, copy));
        return response;
      })
      .catch(() =>
        caches.match(request).then((cached) => {
          if (cached) return cached;
          if (request.mode === "navigate") return caches.match("/index.html");
          return undefined;
        })
      )
  );
});
