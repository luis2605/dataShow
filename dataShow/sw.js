// sw.js

// Define a cache name for your assets
const cacheName = "my-app-cache-v1";

// Define an array of assets to cache
const assetsToCache = [
  "/",
  "/index.html",
  "/manifest.json",
  "/public/ic_launcher.png",
  // Add other assets you want to cache here
];

// Install the service worker and cache assets
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(cacheName).then((cache) => {
      return cache.addAll(assetsToCache);
    })
  );
});

// Activate the service worker and clean up old caches
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((name) => name !== cacheName)
          .map((name) => caches.delete(name))
      );
    })
  );
});

// Fetch assets from the cache or the network
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      return cachedResponse || fetch(event.request);
    })
  );
});
