console.log('Service Worker: Registered');

self.addEventListener('install', function(event) {
  console.log("Install event");
  event.waitUntil(
    caches.open('v1').then(function(cache) {
      console.log("Return new cache");
      return cache.addAll(cacheList);
    })
  );
});

self.addEventListener('fetch', function(event) {
  console.log("Fetch event");
  event.respondWith(
    caches.match(event.request).then(function (response) {
      if (response) {
        console.log("Match made with: " + event.request + " in cache");
        return response;
      }
      else {
        console.log("No match with: " + event.request + " in cache");
        return fetch(event.request)
        .then(function(response) {
          const clonedResponse = response.clone();
          caches.open('v1').then(function(cache) {
            cache.put(event.request, clonedResponse);
          })
          return response;
        })
        .catch(function(err) {
          console.error(err);
        })
      }


    })
  );
});

console.log("Creating list of files to cache");
const cacheList = [
  '/index.html',
  '/restaurant.html',
  '/css/styles.css',
  '/js/main.js',
  '/js/restaurant_info.js',
  '/img/1.jpg',
  '/img/2.jpg',
  '/img/3.jpg',
  '/img/4.jpg',
  '/img/5.jpg',
  '/img/6.jpg',
  '/img/7.jpg',
  '/img/8.jpg',
  '/img/9.jpg',
  '/img/10.jpg',
]
