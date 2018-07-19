/**
 * El Service Worker nos permite trabajar la aplicación
 * Offline. Pero la caché almacenada de detectar cambios
 * en la web original. Traerá esos cambios.
 * 
 *      Service Worker
 */

 //Asignar nombre y versión de la caché
 const CACHE_NAME = 'v1_cache_maquistemas_pwa';

 //Ficheros a cachear en la aplicación
 var urlsToCache = [
     './',
     './css/styles.css',
     './img/favicon.png',
     './img/1.png',
     './img/2.png',
     './img/3.png',
     './img/4.png',
     './img/5.png',
     './img/6.png',
     './img/facebook.png',
     './img/instagram.png',
     './img/twitter.png',
     './img/favicon-1024.png',
     './img/favicon-512.png',
     './img/favicon-384.png',
     './img/favicon-256.png',
     './img/favicon-192.png',
     './img/favicon-128.png',
     './img/favicon-96.png',
     './img/favicon-64.png',
     './img/favicon-32.png',
     './img/favicon-16.png'
 ];


 //Evento install
 //Instalacación de serviceWorker y guardar en caché los recursos 
 //estáticos de la aplicación
self.addEventListener('install', e =>{
    e.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache =>{
                return cache.addAll(urlsToCache)
                        .then(()=>{
                            self.skipWaiting();
                        })
                        
            })
            .catch(err =>console.log('No seha registrado el cache', err) )
    );
});

 //Evento activate
 //Para que la app funcione sin conexión
 self.addEventListener('activate', e =>{
    const cacheWhitelist = [CACHE_NAME];

    e.waitUntil(
        caches.keys()
            .then(cacheNames => {
                return Promise.all(
                    cacheNames.map(cacheName => {
                        if(cacheWhitelist.indexOf(cacheName) === -1){
                            //Borrar elementos que no se necesitan
                            return caches.delete(cacheName);
                        }

                    })
                )
            })
            .then(()=>{
                //Activar cache en dispositivo
                self.clients.claim();
            })
    );
 });


 //Evento fetch: para traer actualización desde el servidor
 //Si no existe en la cache actual cachea lo que tiene que cachear
self.addEventListener('fetch', e => {
    e.respondWith(
        caches.match(e.request)
            .then(res =>{
                if(res){
                    //devuelvo datos desde cache
                    return res;
                }

                return fetch(e.request);
            })
    );
});
