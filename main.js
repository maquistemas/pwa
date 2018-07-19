/**
 * El Service Worker nos permite trabajar la aplicación
 * Offline. Pero la caché almacenada de detectar cambios
 * en la web original. Traerá esos cambios.
 * 
 *      Service Worker
 */

if('serviceWorker' in navigator){
    console.log('Puedes usar los serviceWorker en tu navegador');
    navigator.serviceWorker.register('./sw.js')
                            .then(res => console.log('service worker cargado correctamente', res))
                            .catch(err => console.log('servviceWorker no se ha podido registrar', err));
    
}else{
    console.log('No puedes usar los servicesWorker en tu navegador')
}





//Scroll Suavizado
$(document).ready(function(){
    
    $("#menu a").click(function(e){
        e.preventDefault();

        
        $("html, body").animate({
            scrollTop: $($(this).attr("href")).offset().top
        });

        return false;
    });

});