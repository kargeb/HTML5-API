(function() {

if(!window.FileReader) return;

var fileInput = document.querySelector("#fileInput");

fileInput.onchange = function() { // po wybraniu pliku przez użytkownika

    var file = this.files[0], // zapisujemy odwołanie do niego w zmiennej
        reader = new FileReader(); // tworzymy nowy FileReader

    reader.onload = function() { // po wczytaniu pliku

        var blob = new Blob([this.result], {type: "image/jpeg"}); // tworzymy nowy Blob z wynikiem wczytywania pliku i przypisujemy mu wartość MIME Type na image/jpeg

        // var blob = blob.slice(0, 19131); // wycinamy od bajtu 1 do bajtu 19131

        var fileURL = window.URL.createObjectURL(blob); // tworzymy nowy odnośnik do stworzonego Bloba

        var img = new Image(); // tworzymy nowy obrazek, alternatywnie document.createElement("img")
        img.src = fileURL; // i przypisujemy jego atrybut src na nowo stworzony plik

        document.querySelector("#playground").appendChild(img); // wstawiamy obrazek na stronę

        window.URL.revokeObjectURL(fileURL); // puszczamy wolno zapisaną referencję do stworzonego pliku

    }

    reader.readAsArrayBuffer(file); // odczytujemy plik jako ArrayBuffer

}

})();