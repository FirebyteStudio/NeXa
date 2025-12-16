const CACHE = 'nexa-v1'

const FILES = [
  './',
  './index.html',
  './style.css',
  './app.js',
  './auth.js',
  './feed.js',
  './supabase.js',
  './manifest.json',
  './liquid-glass/container.js',
  './liquid-glass/button.js',
  './liquid-glass/styles.css',
  './liquid-glass/glass.css'
]

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE).then(cache => cache.addAll(FILES))
  )
})

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(res => res || fetch(e.request))
  )
})
