const CACHE_NAME = 'dict-cache';

// Add whichever assets you want to pre-cache here:
const PRECACHE_ASSETS = [
    '/icons/',
    '/dictionary_js/',
    'about.html',
    "index.html",
    "contact.html",
    "entry.html",
    "/CSS/"
]

// Listener for the install event - pre-caches our assets list on service worker install.
self.addEventListener('install', event => {
    event.waitUntil((async () => {
        const cache = await caches.open(CACHE_NAME);
        cache.addAll(PRECACHE_ASSETS);
    })());
});

self.addEventListener('activate', event => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', event => {
  event.respondWith(async () => {
      const cache = await caches.open(CACHE_NAME);

      // match the request to our cache
      const cachedResponse = await cache.match(event.request, {ignoreSearch:true});
      console.log(cachedResponse);
      // check if we got a valid response
      if (cachedResponse !== undefined) {
          // Cache hit, return the resource
          return cachedResponse;
      } else {
        // Otherwise, go to the network
          return fetch(event.request)
      };
  });
});