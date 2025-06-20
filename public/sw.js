// Service Worker for caching
const CACHE_NAME = 'brat-generator-v1';
const urlsToCache = [
  '/',
  '/blog',
  '/line.png',
  '/favicon.ico',
  '/_next/static/css/',
  '/_next/static/js/'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // 如果在缓存中找到，返回缓存版本
        if (response) {
          return response;
        }
        
        // 否则从网络获取
        return fetch(event.request);
      })
  );
});