self.addEventListener('fetch', function(event) {
  event.respondWith(
    fetch(event.request).catch(function() {
      return caches.match(event.request);
    })
  );
});

  var CACHE_VERSION = 'app-v1';
var CACHE_FILES = [
  '/',
  'shows/popular',
  'https://fonts.googleapis.com/css?family=Open+Sans:400&display=swap'
];

self.addEventListener('activate', function(event){
  console.log(event);
});

self.addEventListener('install', function (event) {
  event.waitUntil(
    caches.open(CACHE_VERSION)
      .then(function (cache) {
        console.log('Opened cache');
        return cache.addAll(CACHE_FILES);
      }).catch((e) => console.log(e))
  );
});


