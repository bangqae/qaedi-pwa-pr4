var CACHE_NAME = 'qaedinahri-cache'; //nama cache
//file yang akan di cache, titik adalah root file
var urlsToCache = [ 
  '.',
  'index.html',
  'assets/css/styles/main.css'
];

//sw tidak perlu di cahce, karena jalan duluan

self.addEventListener('install', function(event) { //perintah install
  event.waitUntil( //jangan matikan sw dulu sebelum
    caches.open(CACHE_NAME) //cache terbuka
    .then(function(cache) { //fungsi cache
      return cache.addAll(urlsToCache); //masukkan file yg akan di cache ke cache
    })
  );
});

self.addEventListener('fetch', function(event) { //perintah fetch data
  event.respondWith( //respon event dengan
    caches.match(event.request) //mencocokkan data yg ada di server, cek apakah cache yg ada dgn yg di server
    .then(function(response) { //fungsi respon
      return response || fetchAndCache(event.request); //saat pertama jalan jika ada cache respon, jika tidak ada cache data ke browser
    })
  );
});
  
function fetchAndCache(url) { //fungsi fetch dan cache
  return fetch(url) //fetch url web
  .then(function(response) { //fungsi response sebagai notifikasi
  // Check if we received a valid response
    if (!response.ok) { //jika sudah ada cache
      throw Error(response.statusText); //munculkan error
    }
    return caches.open(CACHE_NAME) //buka cache
    .then(function(cache) { //fungsi cache
      cache.put(url, response.clone()); //masukkan atau copykan file cache dari sw ke dalam cache di browser
      return response;
    });
  })
  .catch(function(error) {
    console.log('Request failed:', error);
    // You could return a custom offline 404 page here
  });
}