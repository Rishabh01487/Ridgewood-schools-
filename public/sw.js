// Ridgewood School Service Worker
// Minimal service worker — required by Chrome/Edge to show the "Install App" prompt.
// Caches the main page for offline use and basic navigation fallback.

const CACHE_NAME = "ridgewood-v1";
const PRECACHE_URLS = ["/", "/manifest.webmanifest"];

// Install: pre-cache the homepage
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) =>
      cache.addAll(PRECACHE_URLS).catch(() => {
        // If any precache fails, ignore — we'll still serve from network
      })
    )
  );
  self.skipWaiting();
});

// Activate: clean up old caches
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k))
      )
    )
  );
  self.clients.claim();
});

// Fetch: network-first for navigations, cache-first for static assets (offline fallback)
self.addEventListener("fetch", (event) => {
  const { request } = event;
  // Only handle GET requests
  if (request.method !== "GET") return;

  const url = new URL(request.url);
  // Skip cross-origin requests (e.g. Google Fonts, MongoDB)
  if (url.origin !== self.location.origin) return;
  // Skip API routes — always fetch fresh
  if (url.pathname.startsWith("/api/")) return;
  // Skip _next/static — Next.js handles its own caching
  if (url.pathname.startsWith("/_next/static/")) return;

  // For navigation requests (HTML pages), try network first, fall back to cache
  if (request.mode === "navigate") {
    event.respondWith(
      fetch(request)
        .then((response) => {
          // Cache the response for offline use
          const copy = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(request, copy));
          return response;
        })
        .catch(() => caches.match(request).then((c) => c || caches.match("/")))
    );
    return;
  }

  // For other GET requests, try cache first, fall back to network
  event.respondWith(
    caches.match(request).then(
      (cached) =>
        cached ||
        fetch(request).then((response) => {
          // Cache successful responses
          if (response.ok && response.type === "basic") {
            const copy = response.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(request, copy));
          }
          return response;
        }).catch(() => cached)
    )
  );
});
