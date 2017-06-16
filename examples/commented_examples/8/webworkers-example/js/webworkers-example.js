(function() {

if(typeof Worker == undefined) return;

// var worker = new Worker("examples/8/webworkers-example/js/worker.js");

var jsBlob = new Blob([document.querySelector("#worker").textContent], {type: "text/javascript"}); // tworzymy nowy obiekt Blob z treścią pobraną z elementu script

var workerURL = window.URL.createObjectURL(jsBlob); // tworzymy nowy odnośnik do stworzonego pliku

var worker = new Worker(workerURL); // tworzymy nowy Worker przekazując mu odnośnik do pliku .js

window.URL.revokeObjectURL(workerURL); // puszczamy wolno zapisaną do pliku referencję

worker.addEventListener("message", function(e) { // kiedy Worker przyśle do nas wiadomość

    console.log(e.data); // wyświetlamy ją w konsoli

}, false);

worker.postMessage("witaj!"); // wysyłamy wiadomość do stworzonego Workera

})();