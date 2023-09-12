// service-worker.js

const cacheName = "your-app-cache-v1";

const assetsToCache = [
  "/",
  "/index.html",
  "/manifest.json",
  "/dataShowLogo.png",
  // Add other assets you want to cache here
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(cacheName).then((cache) => {
      return cache.addAll(assetsToCache);
    })
  );
});

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

self.addEventListener("fetch", (event) => {
  const requestUrl = new URL(event.request.url);

  // Check if the request is for the specific URL you want to cache
  if (
    requestUrl.origin === "https://luis2605.github.io" &&
    requestUrl.pathname === "/dataShow/"
  ) {
    event.respondWith(
      caches.open(cacheName).then((cache) => {
        return cache.match(event.request).then((cachedResponse) => {
          if (cachedResponse) {
            return cachedResponse;
          }

          // If not found in cache, fetch and cache the response
          return fetch(event.request).then((response) => {
            cache.put(event.request, response.clone());
            return response;
          });
        });
      })
    );
  } else {
    // For other requests, use the default fetch strategy
    event.respondWith(
      caches.match(event.request).then((cachedResponse) => {
        return cachedResponse || fetch(event.request);
      })
    );
  }
});
