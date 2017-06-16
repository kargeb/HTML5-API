(function() {

if(typeof Worker == undefined) return;

var canvas = document.querySelector("#canvas"),
    ctx = canvas.getContext("2d"),
    button = document.querySelector("#filterBtn"),
    img = document.createElement("img");

img.onload = function() { // kiedy obrazek zostanie wczytany

    ctx.drawImage(img, 0, 0); // wstawiamy go na Canvas

}

img.src = "template/images/cat.jpg";

var worker = new Worker("examples/8/webworkers-image-filter/js/image-filter.js"); // tworzymy nowego Workera

worker.addEventListener("message", function(e) { // kiedy Worker przyśle nam wiadomość

    ctx.putImageData(e.data, 0, 0); // wstawiamy otrzymane dane na Canvas

}, false);

function applyFilters() {

    var canvasData = ctx.getImageData(0, 0, canvas.width, canvas.height), // pobieramy piksele z Canvasu
        length = canvasData.data.length; // zapisujemy długość tablicy danych Canvas w zmiennej

    worker.postMessage(canvasData); // wysyłamy dane z Canvasu do Workera

    // for(var j = 0; j < 1000; j++) {

    //     for(var i = 0; i < length; i += 4) {

    //         var r = 0.025 * canvasData.data[i] + 0.126 * canvasData.data[i + 1] + 0.068 * canvasData.data[i + 2];
    //         var g = 0.099 * canvasData.data[i] + 0.163 * canvasData.data[i + 1] + 0.071 * canvasData.data[i + 2];
    //         var b = 0.056 * canvasData.data[i] + 0.222 * canvasData.data[i + 1] + 0.999 * canvasData.data[i + 2];

    //         canvasData.data[i] = r;
    //         canvasData.data[i + 1] = g;
    //         canvasData.data[i + 2] = b;

    //     }

    // }

    // for(var i = 0; i < length; i += 4) {

           // Filtr odwracający kolory obrazka
    //     canvasData.data[i] = 255 - canvasData.data[i];
    //     canvasData.data[i + 1] = 255 - canvasData.data[i + 1];
    //     canvasData.data[i + 2] = 255 - canvasData.data[i + 2];
    //     canvasData.data[i + 3] = 255;

    //     /*

    //     [r] => 0 - 255
    //     [g] => 0 - 255
    //     [b] => 0 - 255
    //     [a] => 0 - 255 (0 - przezroczysty, 255 - pełny)

    //     */

    // }

    // ctx.putImageData(canvasData, 0, 0);

}

button.onclick = applyFilters; // na kliknięcie przycisku nakładamy filtr

})();