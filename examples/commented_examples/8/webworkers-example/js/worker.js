importScripts("info.js"); // importujemy skrypt z tego samego katalogu

self.addEventListener("message", function(e) { // kiedy przeglądarka wyśle do nas wiadomość

    setTimeout(function() { // ustawiamy timeout na 3 sekundy

        self.postMessage("Odsyłam: " + e.data + " Wiadomość: " + info); // odsyłamy przysłaną wiadomość, a także wartość zmiennej info z zaimportowanego skryptu

    }, 3000);


}, false);