const CACHE_NAME = "app-academica-v2";

const ARCHIVOS = [
    "./",
    "./index.html",
    "./menu.css",
    "./AppProm.html",
    "./app.js",
    "./style.css",

    "./Notas/NotaDefinitiva.html",
    "./Notas/script.js",
    "./Notas/style.css",

    "./NotaNecesito/NotaNecesito.html",
    "./NotaNecesito/script.js",
    "./NotaNecesito/style.css",

    "./iconos/icon-192.png",
    "./iconos/icon-512.png"
];


// Instalar el Service Worker
self.addEventListener("install", event => {

    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => cache.addAll(ARCHIVOS))
    );

    self.skipWaiting();
});


// Activar el Service Worker
self.addEventListener("activate", event => {

    event.waitUntil(
        caches.keys().then(nombres => {

            return Promise.all(
                nombres
                    .filter(nombre => nombre !== CACHE_NAME)
                    .map(nombre => caches.delete(nombre))
            );

        })
    );

    self.clients.claim();
});


// Interceptar las solicitudes
self.addEventListener("fetch", event => {

    event.respondWith(

        caches.match(event.request)
            .then(respuesta => {

                return respuesta || fetch(event.request);

            })

    );

});
