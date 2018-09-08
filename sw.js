//console.log('Service Worker: Registered');

self.addEventListener('install', function(event) {//when SW is installed, establish cache
  //console.log("Install event");
  event.waitUntil(
    caches.open('restaurant-reviews-v1').then(function(cache) {
      //console.log("Return new cache");
      return cache.addAll(cacheList);
    })
  );
});

self.addEventListener('fetch', function(event) {//hijacks fetch requests
  //console.log("Fetch event");
  event.respondWith(
    caches.match(event.request).then(function (response) {//checks for match in cache
      if (response) {
        //console.log("Match made with: " + event.request + " in cache");
        return response;//returns match if found
      }
      else {//if no match is found, add new file to cache, and then respond to request
        //console.log("No match with: " + event.request + " in cache");
        return fetch(event.request)
        .then(function(response) {
          const cacheResponse = response.clone();//copy response to add to cache
          caches.open('restaurant-reviews-v1').then(function(cache) {
            cache.put(event.request, cacheResponse);
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

//console.log("Creating list of files to cache");
const cacheList = [
  '/index.html',
  '/restaurant.html',
  '/css/styles.css',
  '/js/*',
  '/img/*',
]
