// Service worker mínimo — solo existe para cumplir el requisito de "instalable" (PWA).
// No hace caché ni maneja modo offline; simplemente deja pasar todas las peticiones.

self.addEventListener('install', () => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', () => {
  // no-op: deja que el navegador maneje la petición normalmente
});
