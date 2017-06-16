(function() {

if(!document.createElement("canvas").getContext) return; // jeśli brak wsparcia dla Canvas, kończymy działanie funkcji

var sketchpad = { // tworzymy obiekt, w którym zamkniemy metody

    enableDrawing: function(e) { // metoda uruchamiająca proces rysowania

        this.mouseDown = true; // przycisk myszy wciśnięty, a więc można rysować

        this.ctx.beginPath(); // rozpoczynamy nową ścieżkę
        this.ctx.moveTo(this.getX(e), this.getY(e)); // przenosimy się do punktu kliknięcia myszą

    },

    disableDrawing: function(e) { // metoda wyłączająca możliwość rysowania, kiedy przycisk myszy nie wciśnięty

        this.mouseDown = false;

    },

    drawLines: function(e) { // metoda rysunąca linie

        if(!this.mouseDown) return; // jeśli przycisk myszy nie wciśnięty, kończymy

        var x = this.getX(e), // pobieramy współrzędną X zdarzenia
            y = this.getY(e); // pobieramy współrzędną Y zdarzenia

        this.ctx.lineTo(x, y); // ustawiamy linię do tych punktów
        this.ctx.stroke(); // rysujemy linię

    },

    getX: function(e) { // metoda do pobierania pozycji X zdarzenia wewnątrz elementu

        var boundries = this.canvas.getBoundingClientRect(); // pobieramy pozycję x, y brzegu elementu

        if(e.offsetX) { // jeśli przeglądarka wspiera offsetX
            return e.offsetX; // to po prostu zwracamy tą wartość
        } else if(e.clientX) { // jeśli wspiera clientX (x relatywnie do brzegu przeglądarki)
            return e.clientX - boundries.left; // to zwracamy różnicę od miejsca zdarzenia, do lewej krawędzi elementu
        }

    },

    getY: function(e) { // metoda do pobierania pozycji Y zdarzenia wewnątrz elementu

        var boundries = this.canvas.getBoundingClientRect(); // pobieramy pozycję x, y brzegu elementu

        if(e.offsetY) { // jeśli przeglądarka wspiera offsetY
            return e.offsetY; // to po prostu zwracamy tą wartość
        } else if(e.clientY) { // jeśli wspiera clientY (y relatywnie do górnego brzegu przeglądarki)
            return e.clientY - boundries.top; // to zwracamy różnicę od miejsca zdarzenia, do górnej krawędzi elementu
        }

    },

    changePenColor: function(e) { // metoda zmieniająca kolor pióra

        this.con.querySelector(".current").classList.remove("current"); // usuwamy klase z aktualnie zaznaczonego kwadraciku z kolorem
        e.target.classList.add("current"); // i dodajemy ją do aktualnie klikniętego elementu

        this.ctx.strokeStyle = e.target.dataset.color; // ustawiamy strokeStyle Canvasu na kolor z atrybutu data-color klikniętego elementu

    },

    changePenSize: function(penSize) { // metoda zmieniająca wielkość pióra

        this.ctx.lineWidth = penSize;

    },

    clearCanvas: function() { // metoda czyszcząca całe pole Canvas

        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        // tutaj można go ponownie wypełnić kolorem białym

    },

    setupCanvas: function() { // metoda ustawiająca pole Canvas

        this.canvas.width = this.canvasCon.offsetWidth; // szerokość Canvasu równa szerokości jego rodzica
        this.canvas.height = this.canvasCon.offsetHeight; // wysokośc Canvasu równa wysokości jego rodzica
        this.mouseDown = false; // czy wciśnięto przycisk myszy? nie.

        this.ctx = this.canvas.getContext("2d"); // kontekst, poprzez który będziemy rysować

        this.ctx.fillStyle = "#fff"; // białe wypełnienie
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height); // wypełnieniego całego pola na biało

        this.ctx.lineWidth = this.range.value; // wielkość pióra równa value z elementu input typu range
        this.ctx.lineJoin = "round"; // zaokrąglone łączenie linii
        this.ctx.lineCap = "round"; // zaokrąglone zakończenie linii
        this.ctx.strokeStyle = this.con.querySelector(".current").dataset.color; // kolor pióra równy kolorowi (data-color) elementu div z klasą 'current'

        this.canvas.onmousemove = this.drawLines.bind(this); // zdarzenie na poruszanie myszą nad polem Canvas
        this.canvas.onmousedown = this.enableDrawing.bind(this); // zdarzenie na wciśnięcie przycisku myszy na polu Canvas
        this.canvas.onmouseup = this.disableDrawing.bind(this); // zdarzenie na puszczenie przycisku myszy na polu Canvas

    },

    saveImage: function() { // metoda generująca obrazek z treści pola Canvas

        var img = new Image(); // tworzymy nowy obrazek, alternatywnie document.createElement("img")
        img.src = this.canvas.toDataURL("image/png"); // ustawiamy jego atrybut src na zapisaną do dataURI wartośc pola Canvas

        this.con.appendChild(img); // wstawiamy obrazek na stronę

    },

    setupSidebar: function() { // metoda ustawiająca Sidebar

        [].forEach.call(this.colors, function(color) { // iterujemy po wszystkich divach z kolorami
            color.style.backgroundColor = color.dataset.color; // i przypisujemy każdemu jako background-color wartość jego atrybutu data-color

            color.onclick = this.changePenColor.bind(this); // przypisujemy zdarzenie kliknięcia i wywołanie metody changePenColor

        }.bind(this));

        this.range.onchange = function(e) { // przypisujemy zdarzenie na zmianę wartości w polu typu range
            this.rangeOutput.innerHTML = e.target.value; // wstawiamy tą wartość na stronę, aby była widoczna dla użytkownika

            this.changePenSize(e.target.value); // wywołujemy metodę changePenSize i przekazujemy jej nową wartość
        }.bind(this);

    },

    init: function() { // metoda inicjująca SketchPad

        this.con = document.querySelector("#sketchpad");
        this.canvasCon = this.con.querySelector(".canvas");
        this.canvas = this.con.querySelector("canvas");

        this.colors = this.con.querySelectorAll(".colors div");
        this.range = this.con.querySelector("input[type='range']");
        this.rangeOutput = this.con.querySelector("output strong");

        this.clearButton = this.con.querySelector("#clear");
        this.clearButton.onclick = this.clearCanvas.bind(this);

        this.saveButton = this.con.querySelector("#save");
        this.saveButton.onclick = this.saveImage.bind(this);

        this.setupSidebar(); // ustawiamy Sidebar
        this.setupCanvas(); // ustawiamy Canvas

    }

}

sketchpad.init(); // wywołujemy metodą init, która rozpoczyna działanie aplikacji

})();