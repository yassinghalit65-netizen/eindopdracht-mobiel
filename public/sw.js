const CACHE_NAME = 'bmi-pwa-v2';
const OFFLINE_URL = '/offline';

const urlsToCache = [
    '/',
    '/css/style.css',
    '/js/app.js',
    '/js/db.js',
    '/js/chart.js',
    '/js/i18n.js',
    '/manifest.json',
    'https://cdn.jsdelivr.net/npm/chart.js@4.4.0/dist/chart.umd.min.js'
];

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME).then(async cache => {
            return cache.addAll(urlsToCache);
        })
    );
    self.skipWaiting();
});

self.addEventListener('fetch', event => {
    // HTML requests: probeer netwerk, fallback naar cache
    if (event.request.mode === 'navigate') {
        event.respondWith(
            fetch(event.request).catch(() => {
                return caches.match(event.request).then(response => {
                    return response || caches.match('/');
                });
            })
        );
        return;
    }
    
    // Andere requests: cache eerst
    event.respondWith(
        caches.match(event.request).then(response => {
            return response || fetch(event.request).then(fetchResponse => {
                return caches.open(CACHE_NAME).then(cache => {
                    cache.put(event.request, fetchResponse.clone());
                    return fetchResponse;
                });
            });
        })
    );
});

self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(keys => {
            return Promise.all(
                keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
            );
        })
    );
    self.clients.claim();
});