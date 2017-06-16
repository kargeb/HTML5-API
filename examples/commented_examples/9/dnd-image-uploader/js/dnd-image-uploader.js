(function() {

var imageUploader = { // tworzymy obiekt, w którym zamkniemy wszystkie metody

    addHover: function() { // dodajemy klasę sygnalizującą najechanie na pole upuszczania

        this.dropZone.classList.add("dragOver");

    },

    removeHover: function() { // usuwamy klasę sygnalizującą najechanie na pole upuszczania

        this.dropZone.classList.remove("dragOver");

    },

    cancelDefault: function(e) { // zapobiegamy domyślnej akcji przeglądarki, by obsłużyć zdarzenie ondrop

        e.preventDefault();
        return false;

    },

    handleDrop: function(e) { // metoda obsługująca zdarzenie ondrop

        e.preventDefault(); // zapobiegamy domyślnej akcji przeglądarki
        e.stopPropagation(); // zapobiegamy wywoływaniu zdarzenia ondrop na rodzicach elementu

        var files = e.dataTransfer.files; // zapisujemy w zmiennej upuszczone pliki

        [].forEach.call(files, function(file) { // iterujemy po wszystkich plikach

            if(file.type.match("image.*")) { // jeśli MIME Type pliku zgadza sie ze wzorem
                this.generateThumbnail(file); // generujemy miniaturkę zdjęcia
                this.addToUploadList(file); // dodajemy zdjęcie do kolejki przed wysłaniem na serwer
            }

        }.bind(this));

        this.removeHover(); // usuwamy podświetlenie pola

    },

    generateThumbnail: function(file) { // metoda generująca miniaturki zdjęć

        var reader = new FileReader(), // tworzymy nowy FileReader
            img = new Image(); // tworzymy nowy obrazek, alternatywnie document.createElement("img")

        reader.onload = function() { // po wczytaniu pliku
            img.src = reader.result; // ustawiamy atrybut obrazka na rezultat odczytywania
        }

        reader.readAsDataURL(file); // odczytujemy plik jako DataURI

        this.imagesContainer.appendChild(img); // wstawiamy miniaturkę na stronę
    },

    addToUploadList: function(file) { // metoda dodająca pliki do listy przez wysłaniem

        this.formData.append("images[]", file); // dodajemy kolejny element do formData
        this.filesAdded++; // zwiększamy licznik dodanych plików

    },

    sendFiles: function() { // metoda wysyłająca pliki na serwer

        if(this.filesAdded == 0) return; // jeśli nie dodano żadnych plików, kończymy działanie funkcji

        this.sendButton.onclick = null; // usuwamy zdarzenie onclick z przycisku do wysyłania
        this.sendButton.setAttribute("disabled", "disabled"); // oznaczamy ten przycisk jako nieaktywny

        var xhr = new XMLHttpRequest(); // nowy obiekt AJAX

        xhr.open("POST", "examples/9/dnd-image-uploader/image_uploader.php", true); // ścieżka do pliku PHP na serwerze

        xhr.onload = function(e) { // po wysłaniu danych na serwer

            if(e.target.status != 200) { // jeśli cos poszło nie tak
                this.setStatus(true, "Wystąpił błąd!");
                return; // kończymy działanie funkcji
            }

            var responseObject = JSON.parse(e.target.responseText); // zamieniamy przysłany string na obiekt

            this.setStatus(responseObject.error, responseObject.message); // ustawiamy status przekazując dane z przysłanego obiektu

        }.bind(this);

        xhr.onprogress = this.updateProgress.bind(this); // na postęp przesyłania na serwer

        xhr.send(this.formData); // wysyłamy dane na serwer

    },

    updateProgress: function(e) { // metoda pokazująca postęp przesyłania na serwer

        if(e.lengthComputable) { // jeśli można obliczyć
            var percentLoaded = (e.loaded / e.total) * 100; // wyliczamy procent przesłania
        }

        this.progressBar.style.width = percentLoaded + "%"; // i ustawiamy w CSS width paska załadowania
        this.progressBar.querySelector("span").innerHTML = percentLoaded + "%"; // a także wstawiamy do niego wartość procentową jako tekst

    },

    setStatus: function(isError, message) { // metoda wyświetlająca status

        this.status.style.display = "block"; // pokazujemy element na stronie
        this.status.innerHTML = message; // ustawiamy jego treść na przekazaną wiadomość

        if(isError) { // jeśli isError ma wartość true
            this.status.classList.add("alert-danger"); // przypisujemy czerwony kolor do elementu
        } else { // w przeciwnym wypadku
            this.status.classList.add("alert-success"); // przypisujemy zielony kolor do elementu
        }

    },

    init: function() { // metoda inicjująca aplikację

        if(!"draggable" in document.createElement("span") || !window.FileReader) { // jeśli brak wsparcia dla Drag and Drop i FileReadera
            return; // kończymy działanie funkcji
        }

        // Zapisujemy potrzebne elementy HTML
        this.dropZone = document.querySelector("#dropZone");
        this.imagesContainer = document.querySelector("#imagesContainer");
        this.sendButton = document.querySelector("#send");
        this.status = document.querySelector("#status");
        this.progressBar = document.querySelector("#progress");

        this.dropZone.ondragenter = this.addHover.bind(this); // na najechanie na pole do upuszczania
        this.dropZone.ondragleave = this.removeHover.bind(this); // na wyjechanie z pola upuszczania
        this.dropZone.ondragover = this.cancelDefault; // anulowanie domyślnej akcji, aby obsłużyć ondrop
        this.dropZone.ondrop = this.handleDrop.bind(this); // na upuszczenie

        this.filesAdded = 0; // ilość dodanych plików
        this.formData = new FormData(); // nowy obiekt FormData, do którego dodamy pliki

        this.sendButton.onclick = this.sendFiles.bind(this); // na wciśnięcie przycisku 'Wyślij'

    }

}

imageUploader.init(); // uruchomienie aplikacji

})();