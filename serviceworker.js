const assets = [
  "./",
  "./about.html",
  "./autocomplete.js",
  "./bases.js",
  "./bases_21323.js",
  "./buttonSearch.js",
  "./contact.html",
  "./dictionary_js/cyrillic_convert.js",
  "./dictionary_js/fileread_search.js",
  "./dictionary_js/final_dict.tsv",
  "./dictionary_js/foma_apply_down.js",
  "./dictionary_js/foma_print.js",
  "./dictionary_js/ipa_cyrillic.js",
  "./dictionary_js/morpheme_transducer.js.txt",
  "./dictionary_js/postbases_infl.js",
  "./dictionary_js/transducer.js",
  "./dictionary_js/transducer_inverted.js",
  "./displayWords.js",
  "./entry.html",
  "./icons/analyzer.png",
  "./icons/analyzer_hires.png",
  "./icons/android-chrome-192x192.png",
  "./icons/android-chrome-512x512.png",
  "./icons/apple-touch-icon.png",
  "./icons/contact.png",
  "./icons/contact_hires.png",
  "./icons/corpus.png",
  "./icons/corpus_hires.png",
  "./icons/entry_diagram.png",
  "./icons/favicon-16x16.png",
  "./icons/favicon-32x32.png",
  "./icons/favicon.ico",
  "./icons/lab_group.png",
  "./icons/lab_group_hires.png",
  "./icons/mstile-150x150.png",
  "./icons/ReportIssueButton.png",
  "./icons/safari-pinned-tab.svg",
  "./icons/Sivuqaq_icon.png",
  "./icons/Sivuqaq_icon@2x.png",
  "./icons/Sivuqaq_icon_old.png",
  "./icons/spellchecker.png",
  "./icons/spellchecker_hires.png",
  "./icons/word_wheel.png",
  "./index.html",
  "./inflections.js",
  "./inflections_new.js",
  "./inflections_replace.js",
  "./inflection_tables.js",
  "./inflection_tables_new.js",
  "./morphemes2surface.js",
  "./parseSearch.js",
  "./postbasesjson.json",
  "./results.html",
  "./style_about.css",
  "./style_contact.css",
  "./style_dictionary.css",
  "./style_entry.css",
  "./style_results.css",
  "./utilities_js/controller.js",
  "./utilities_js/cyrillic.js",
  "./utilities_js/h-words.tsv",
  "./utilities_js/h.words.txt",
  "./utilities_js/yupik.js",
  "./wordoftheday.js"
]

const addResourcesToCache = async (resources) => {
    const cache = await caches.open('v1');
    await cache.addAll(resources);
  };
  
  const putInCache = async (request, response) => {
    const cache = await caches.open('v1');
    await cache.put(request, response);
  };
  
  const cacheFirst = async ({ request, preloadResponsePromise, fallbackUrl }) => {
    // First try to get the resource from the cache
    const responseFromCache = await caches.match(request);
    if (responseFromCache) {
      return responseFromCache;
    }
  
    // Next try to use the preloaded response, if it's there
    const preloadResponse = await preloadResponsePromise;
    if (preloadResponse) {
      console.info('using preload response', preloadResponse);
      putInCache(request, preloadResponse.clone());
      return preloadResponse;
    }
  
    // Next try to get the resource from the network
    try {
      const responseFromNetwork = await fetch(request.clone());
      // response may be used only once
      // we need to save clone to put one copy in cache
      // and serve second one
      putInCache(request, responseFromNetwork.clone());
      return responseFromNetwork;
    } catch (error) {
      const fallbackResponse = await caches.match(fallbackUrl);
      if (fallbackResponse) {
        return fallbackResponse;
      }
      // when even the fallback response is not available,
      // there is nothing we can do, but we must always
      // return a Response object
      return new Response('Network error happened', {
        status: 408,
        headers: { 'Content-Type': 'text/plain' },
      });
    }
  };
  
  const enableNavigationPreload = async () => {
    if (self.registration.navigationPreload) {
      // Enable navigation preloads!
      await self.registration.navigationPreload.enable();
    }
  };
  
  self.addEventListener('activate', (event) => {
    event.waitUntil(enableNavigationPreload());
  });
  
  self.addEventListener('install', (event) => {
    event.waitUntil(
      addResourcesToCache(assets)
    );
  });
  
  self.addEventListener('fetch', (event) => {
    event.respondWith(
      cacheFirst({
        request: event.request,
        preloadResponsePromise: event.preloadResponse,
        fallbackUrl: './uuids.txt',
      })
    );
  });
