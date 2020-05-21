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
  'https://fonts.googleapis.com/css?family=Open+Sans:300,400,500,700&display=swap',
  'https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@1,300&display=swap',
  '/bootstrap.mui.css',
  '/bundle.js'
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


