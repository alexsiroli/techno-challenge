// Service worker placeholder to prevent Next.js dynamic routing fallback errors on localhost:3000
self.addEventListener('install', () => {
  self.skipWaiting();
});
self.addEventListener('activate', () => {
  self.clients.claim();
});
