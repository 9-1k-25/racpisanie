const CACHE_NAME = 'schedule-v1';
const ASSETS = [
  './',
  './index.html',
  './style.css',
  './index.js'
];

// Установка: кэшируем файлы
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
  );
});

// Работа: отдаем файлы из кэша, если нет сети
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});