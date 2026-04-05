const CACHE_NAME = "invision-network-v8";
const IMAGE_CACHE = "invision-images-v6";
const JS_CACHE = "invision-js-v1";
const STATIC_ASSETS = [
  "/index.html",
  "/favicon.ico",
  "/robots.txt",
  "/manifest.json",
];

// Install event - cache static assets
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(STATIC_ASSETS);
    }),
  );
  self.skipWaiting();
});

// Activate event - clean up old caches
self.addEventListener("activate", (event) => {
  const validCaches = new Set([CACHE_NAME, IMAGE_CACHE, JS_CACHE]);
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((name) => !validCaches.has(name))
          .map((name) => caches.delete(name)),
      );
    }),
  );
  self.clients.claim();
});

// Fetch event - smart caching strategy
self.addEventListener("fetch", (event) => {
  const request = event.request;
  const url = new URL(request.url);

  // Only handle same-origin GET requests
  if (request.method !== "GET" || url.origin !== self.location.origin) {
    return;
  }

  // Ignore dev/HMR routes to avoid interfering with Vite
  if (
    url.pathname.startsWith("/@") ||
    url.pathname.startsWith("/src/") ||
    url.pathname.includes("vite") ||
    url.searchParams.has("t")
  ) {
    return;
  }

  // Images: cache-first with long expiry
  if (
    request.destination === "image" ||
    /\.(jpg|jpeg|png|gif|webp|svg|ico)$/i.test(url.pathname)
  ) {
    event.respondWith(
      caches.match(request).then((cached) => {
        if (cached) {
          return cached;
        }
        return fetch(request)
          .then((response) => {
            // Only cache successful responses
            if (response.ok) {
              const responseClone = response.clone();
              caches.open(IMAGE_CACHE).then((cache) => {
                cache.put(request, responseClone);
              });
            }
            return response;
          })
          .catch(() => {
            // Return empty image on failure
            return new Response("", {
              status: 404,
              statusText: "Image not found",
            });
          });
      }),
    );
    return;
  }

  // Fonts and CSS: cache-first
  if (
    request.destination === "font" ||
    request.destination === "style" ||
    /\.(woff2?|ttf|otf|eot|css)$/i.test(url.pathname)
  ) {
    event.respondWith(
      caches.match(request).then((cached) => {
        return (
          cached ||
          fetch(request).then((response) => {
            const responseClone = response.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(request, responseClone);
            });
            return response;
          })
        );
      }),
    );
    return;
  }

  // JS chunks with hash in filename: cache-first (immutable)
  if (
    /\/assets\/js\/.*-[a-zA-Z0-9]{8}\.js$/i.test(url.pathname)
  ) {
    event.respondWith(
      caches.match(request).then((cached) => {
        if (cached) return cached;
        return fetch(request).then((response) => {
          if (response.ok) {
            const clone = response.clone();
            caches.open(JS_CACHE).then((cache) => cache.put(request, clone));
          }
          return response;
        });
      }),
    );
    return;
  }

  // HTML navigation: network-first with cache fallback
  if (request.mode === "navigate") {
    event.respondWith(fetch(request).catch(() => caches.match("/index.html")));
    return;
  }

  // Known static assets: cache-first
  if (STATIC_ASSETS.includes(url.pathname)) {
    event.respondWith(
      caches.match(request).then((cached) => {
        if (cached) {
          return cached;
        }
        return fetch(request).then((response) => {
          const responseClone = response.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(request, responseClone);
          });
          return response;
        });
      }),
    );
  }
});
