(function() {

if(!window.FileReader) return;

var fileInput = document.querySelector("#fileInput"),
    start = document.querySelector("#start"),
    stop = document.querySelector("#stop"),
    progress = document.querySelector("#progress");

fileInput.onchange = function() { // po wybraniu pliku przez użytkownika

    var file = this.files[0], // zapisujemy odwołanie do niego w zmiennej
        reader = new FileReader(); // tworzymy nowy FileReader

    // reader.onload = function(e) { // po wczytaniu pliku
    //     console.log(this.result); // wyświetlamy jego zawartość w konsoli
    // }

    // reader.readAsText(file); // odczytujemy jako czysty tekst
    // reader.readAsBinaryString(file); // odczytujemy jako string binarny

    // if(file.type.match("image.*")) { // jeśli MIME Type pliku zgadza się ze wzorem

    //     reader.onload = function() { // po wczytanie pliku

    //         var img = new Image(); // tworzymy nowy obrazek, alternatywnie document.createElement("img")
    //         img.src = this.result; // i przypisujemy jego atrybut src na odczytaną treść pliku w formacie DataURI

    //         document.querySelector("#playground").appendChild(img); // wstawiamy obrazek na stronę

    //     }

    //     reader.readAsDataURL(file); // odczytujemy plik jako DataURI

    // }

    reader.onloadstart = function() { // na rozpoczęcie wczytywania
        console.log("Start odczytywania. readyState: " + this.readyState);
    }

    reader.onload = function() { // na poprawne zakończenie wczytywania
        console.log("Wczytywanie zakończone sukcesem. readyState: " + this.readyState);
    }

    reader.onloadend = function() { // na zakończenie wczytywania (również niepoprawne)
        console.log("Zakończono odczytywanie. readyState: " + this.readyState);
    }

    reader.onprogress = function(e) { // na postęp wczytywania

        if(e.lengthComputable) { // jeśli da się coś obliczyć
            var percent = (e.loaded / e.total) * 100; // wyliczamy procent załadowania

            progress.value = percent; // i ustawiamy jako wartość elementu progress
        }
    }

    reader.onabort = function() { // na przerwanie wczytywania
        console.log("Przerwano odczytywanie pliku. readyState: " + this.readyState);
    }

    reader.onerror = function() { // na wystąpienie błędu wczytywania
        console.log("Wystąpił błąd" + "(" + this.error.code + "): " + this.error.message); // kod błędu i czytelna dla człowieka wiadomość
    }

    start.onclick = function() { // na kliknięcie przycisku Start
        reader.readAsBinaryString(file); // odczytujemy wybrany plik jako string binarny
    }

    stop.onclick = function() { // na wciśnięcie przycisku Stop
        reader.abort(); // przerywamy odczytywanie pliku
    }

}

})();