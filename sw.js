const CACHE='my-savings-v4';
const CORE_FILES=['./','./index.html','./manifest.webmanifest','./icon.svg'];
const OPTIONAL_FILES=['./icon-192.png','./icon-512.png'];

self.addEventListener('install',event=>{
  event.waitUntil((async()=>{
    const cache=await caches.open(CACHE);
    await cache.addAll(CORE_FILES);
    await Promise.allSettled(OPTIONAL_FILES.map(async file=>{
      try {
        const response=await fetch(file,{cache:'reload'});
        if(response.ok) await cache.put(file,response);
      } catch(error) {
        console.warn('Optional app icon not cached yet:',file);
      }
    }));
    await self.skipWaiting();
  })());
});

self.addEventListener('activate',event=>{
  event.waitUntil((async()=>{
    const keys=await caches.keys();
    await Promise.all(keys.filter(key=>key!==CACHE).map(key=>caches.delete(key)));
    await self.clients.claim();
  })());
});

self.addEventListener('fetch',event=>{
  if(event.request.method!=='GET') return;
  event.respondWith((async()=>{
    const cached=await caches.match(event.request);
    if(cached) return cached;
    try {
      const response=await fetch(event.request);
      if(response.ok && new URL(event.request.url).origin===self.location.origin){
        const cache=await caches.open(CACHE);
        cache.put(event.request,response.clone()).catch(()=>{});
      }
      return response;
    } catch(error) {
      return caches.match('./index.html');
    }
  })());
});
