// service-worker.js

// Define a cache name for your assets
const cacheName = "your-app-cache-v1";

// Define an array of assets to cache
const assetsToCache = [
  "/", // Cache the root URL
  "/index.html", // Cache your application's HTML file
  "/manifest.json", // Cache your manifest file
  "/public/dataShowLogo.png", // Cache your app's icon
  // Add other assets you want to cache here
];

// Install the service worker
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(cacheName).then((cache) => {
      return cache.addAll(assetsToCache);
    })
  );
});

// Activate the service worker
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
