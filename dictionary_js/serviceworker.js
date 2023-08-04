const cacheName = "v1"
const assets = [
  "./",
  "./about.html",
  "./autocomplete.js",
  "./bases_21323.js",
  "./buttonSearch.js",
  "./contact.html",
  "./dictionary_js/foma_apply_down.js",
  "./dictionary_js/foma_print.js",
  "./dictionary_js/transducer.js",
  "./dictionary_js/transducer_inverted.js",
  "./displayWords.js",
  "./entry.html",
  "./icons/analyzer_hires.png",
  "./icons/android-chrome-192x192.png",
  "./icons/android-chrome-512x512.png",
  "./icons/apple-touch-icon.png",
  "./icons/contact_hires.png",
  "./icons/corpus_hires.png",
  "./icons/entry_diagram.png",
  "./icons/favicon-16x16.png",
  "./icons/favicon-32x32.png",
  "./icons/favicon.ico",
  "./icons/lab_group_hires.png",
  "./icons/mstile-150x150.png",
  "./icons/ReportIssueButton.png",
  "./icons/safari-pinned-tab.svg",
  "./icons/Sivuqaq_icon.png",
  "./icons/spellchecker_hires.png",
  "./icons/word_wheel.png",
  "./index.html",
  "./inflections.js",
  "./inflection_tables.js",
  "./morphemes2surface.js",
  "./parseSearch.js",
  "./results.html",
  "./style_about.css",
  "./style_contact.css",
  "./style_dictionary.css",
  "./style_entry.css",
  "./style_results.css",
  "./wordoftheday.js"
]

self.addEventListener("install", (event) => {
    event.waitUntil(
        caches
        .open(cacheName)
        .then((cache) => {
            console.log(`Service Worker: Caching Files: ${cache}`);
            cache.addAll(assets);
        }),
    );
});

// Call Activate Event
self.addEventListener('activate', e => {
    console.log('Service Worker: Activated');
    // Clean up old caches by looping through all of the
    // caches and deleting any old caches or caches that
    // are not defined in the list
    e.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(
                    cache => {
                        if (cache !== cacheName) {
                            console.log('Service Worker: Clearing Old Cache');
                            return caches.delete(cache);
                        }
                    }
                )
            )
        })
    );
})

// Call Fetch Event 
self.addEventListener('fetch', e => {
    console.log('Service Worker: Fetching');
    e.respondWith(
        fetch(e.request)
        .then(res => {
            // The response is a stream and in order the browser 
            // to consume the response and in the same time the 
            // cache consuming the response it needs to be 
            // cloned in order to have two streams.
            const resClone = res.clone();
            // Open cache
            caches.open(cacheName)
                .then(cache => {
                    // Add response to cache
                    cache.put(e.request, resClone);
                });
            return res;
        }).catch(
            err => caches.match(e.request)
            .then(res => res)
        )
    );
});
