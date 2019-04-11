self.addEventListener('install', function(event) {
  console.log('Service worker installing...'); //Pesan pada log konsol ketika sw sedang diinstall
  // TODO 3.4: Skip waiting
  // I'm a new service worker
  self.skipWaiting();
});

self.addEventListener('activate', function(event) {
  console.log('Service worker activating...'); //Pesan pada log konsol ketika sw sudah dijalankan
});

self.addEventListener('fetch', function(event) {
  console.log('Fetching:', event.request.url); //Mengambil data
});
  