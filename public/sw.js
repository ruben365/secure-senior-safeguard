// Version 10 - Fix production path issue
const CACHE_NAME = 'invision-network-v10';
const IMAGE_CACHE = 'invision-images-v8';

// On install, clear all old caches
self.addEventListener('install', (event) => {
  console.log('[SW] Installing v10');
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(cacheNames.map((name) => caches.delete(name)));
    })
  );
  self.skipWaiting();
});

// On activate, take control immediately
self.addEventListener('activate', (event) => {
  console.log('[SW] Activating v10');
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter(name => name !== CACHE_NAME && name !== IMAGE_CACHE)
          .map(name => caches.delete(name))
      );
    }).then(() => self.clients.claim())
  );
});

// Fetch handler - network-first for HTML, cache fallback for assets
self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;
  
  // Always get fresh HTML - never cache navigation
  if (event.request.mode === 'navigate' || event.request.destination === 'document') {
    return; // Let browser fetch from network
  }
  
  // Skip dev server paths entirely
  const url = new URL(event.request.url);
  if (url.pathname.startsWith('/src/') || 
      url.pathname.includes('/@vite') ||
      url.pathname.includes('__vite') ||
      url.searchParams.has('t')) {
    return;
  }
  
  // Network-first with cache fallback for other assets
  event.respondWith(
    fetch(event.request)
      .then(response => response)
      .catch(() => caches.match(event.request))
  );
});
