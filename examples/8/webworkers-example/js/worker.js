importScripts("info.js");

self.addEventListener("message", function(e) {

    setTimeout(function() {

        self.postMessage("Odsyłam: " + e.data + " Wiadomość: " + info);

    }, 3000);


}, false);