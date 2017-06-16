self.addEventListener("message", function(e) { // kiedy przeglądarka wyśle do nas wiadomość

    var canvasData = e.data, // zapisujemy przekazany obiekt z zmiennej
        length = canvasData.data.length; // zapisujemy długość tablicy danych Canvas w zmiennej

    for(var j = 0; j < 1000; j++) { // iterujemy 100 razy

        for(var i = 0; i < length; i += 4) { // iterujemy co 4 wartości

            // tworzymy nowe wartości kolorów
            var r = 0.025 * canvasData.data[i] + 0.126 * canvasData.data[i + 1] + 0.068 * canvasData.data[i + 2];
            var g = 0.099 * canvasData.data[i] + 0.163 * canvasData.data[i + 1] + 0.071 * canvasData.data[i + 2];
            var b = 0.056 * canvasData.data[i] + 0.222 * canvasData.data[i + 1] + 0.999 * canvasData.data[i + 2];

            // przypisujemy nowe wartości kolorów
            canvasData.data[i] = r;
            canvasData.data[i + 1] = g;
            canvasData.data[i + 2] = b;

        }

    }

    self.postMessage(canvasData); // odsyłamy przetworzone dane do głównego okna przeglądarki

}, false);