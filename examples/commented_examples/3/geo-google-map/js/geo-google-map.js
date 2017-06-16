(function() {

var map = { // tworzymy obiekt, w którym zamkniemy metody

    makeMap: function() { // metoda dla tworzenia mapy Google

        var loc = this.location.split(","), // rozbijamy string z lokalizacją na tablicę
            pos = new google.maps.LatLng(loc[0], loc[1]); // loc[0] to pierwszy element tablicy (przed przecinkiem), a loc[1] to drugi

        var mapOptions = { // opcje mapy
            zoom: 16, // przybliżenie
            center: pos, // gdzie wycentrować, podajemy stworzoną wyżej pozycję
            mapTypeId: google.maps.MapTypeId.ROADMAP // mapa drogowa
        }

        this.mapObj = new google.maps.Map(document.querySelector("#map"), mapOptions); // podajemy diva, do którego wstawiona zostanie mapa
        this.destination = pos; // zapisujemy pozycję na później

        var marker = new google.maps.Marker({ // dodajemy marker zaznaczający miejsce na mapie
            map: this.mapObj, // podajemy, o którą mapę chodzi
            position: pos, // w którym miejscu marker umieścić
            animation: google.maps.Animation.BOUNCE, // jak ma się zachowywać, tutaj skaczący
            icon: this.options.mapMarker // plik z obrazkiem markera (ścieżka)
        });

    },

    handleRoute: function(result, status) { // metoda wywoływana po wyszukaniu trasy dojazdu

        if(status != google.maps.DirectionsStatus.OK || !result.routes[0]) { // jeśli wystąpiły błędy i nie możemy narysować trasy
            alert("Wprowadziłeś złe dane!");
            return false; // kończymy funkcję
        }

        this.pathRender.setDirections(result); // rysujemy ścieżkę ma mapie
        this.fromInput.value = result.routes[0].legs[0].start_address; // wstawiamy dokładny znaleziony adres do pola input
    },

    prepareRoute: function(coords) { // metoda do przygotowania ścieżki do narysowania

        var renderOptions = { // opcje renderowania ścieżki
            map: this.mapObj, // na której mapie
            polylineOptions: { // jak ma wyglądać linia łącząca punkty
                strokeColor: "#ff0000", // kolor
                strokeWeight: 4, // grubość
                strokeOpacity: 0.8 // przezroczystość
            },
            suppressMarkers: true // usuwamy domyślne markery punktów A i B
        }

        this.pathRender.setOptions(renderOptions); // ustawiamy powyższe opcje dla ścieżki

        var pathData = { // dane potrzebne do narysowania ścieżki
            origin: coords ? coords : this.fromInput.value, // skąd chcemy dojechać, podane w polu input lub znalezione przez geolokalizację
            destination: this.destination, // dokąd jedziemy (tam gdzie ustawiliśmy wcześniej marker z lokalizacją docelową)
            travelMode: google.maps.DirectionsTravelMode.DRIVING // typ mapy dla kierowców
        }

        this.path.route(pathData, this.handleRoute.bind(this)); // przekazujemy dane do narysowania ścieżki i funkcję, która zostanie wykonana (patrz wyżej)

    },

    getGeoData: function() { // metoda do pobrania pozycji z użyciem geolokalizacji

        navigator.geolocation.getCurrentPosition(
            function(position) {
                this.prepareRoute(position.coords.latitude + "," + position.coords.longitude);
            }.bind(this), // funkcja jeśli wszystko OK
            function(errorObj) {
                alert("Wystąpił błąd! Odśwież stronę i spróbuj ponownie.");
            }, // jeśli błąd
            { // obiekt z danymi
                enableHighAccuracy: true // użyj GPS, jeśli możliwe
            }
        );

    },

    checkGeoSupport: function() { // metoda sprawdzająca wsparcie przeglądarki dla geolokalizacji

        if(navigator.geolocation) {
            var findPositionButton = document.querySelector("#findPosition");

            findPositionButton.classList.remove("hidden"); // pokazujemy przycisk

            findPositionButton.onclick = function(e) { // przypisujemy mu na kliknięcie funkcję
                e.preventDefault(); // aby nie wysyłał formularza

                this.getGeoData(); // wykonaj metodę getGeoData
            }.bind(this); // aby wewnątrz funkcji this odwoływało się do obiektu map, a nie do przycisku
        }

    },

    init: function(options) { // metoda inicjująca aplikację

        if(!options.location) return; // jeśli nie podano docelowej lokalizacji, kończymy

        try { google.maps.event.addDomListener(window, "load", this.makeMap.bind(this)); } catch(e) { return; };
        // powyżej próbujemy utworzyć mapę Google

        this.options = options; // zapisujemy podane opcje w zmiennej
        this.location = this.options.location; // osobno zapisujemy również lokalizację
        this.form = document.querySelector("#mapForm"); // formularz

        this.fromInput = document.querySelector("#from"); // pole, w którym można wpisać skąd chce sie dojechać
        this.path = new google.maps.DirectionsService(), // obiekt ścieżki Google Maps
        this.pathRender = new google.maps.DirectionsRenderer(); // obiekt do renderowania ścieżki Google Maps

        this.form.onsubmit = function(e) { // na wysłanie formularza (przycisk 'Pokaż trasę' lub ENTER)
            e.preventDefault(); // zabraniamy wysłania go dalej

            this.prepareRoute(); // szukamy trasy
        }.bind(this);

        this.checkGeoSupport(); // sprawdzamy wsparcie dla geolokalizacji

    }

}

map.init({ // przekazujemy obiekt z lokalizacją oraz ścieżką do obrazka z markerem
    location: "52.16235,21.071409",
    mapMarker: "template/images/map_marker.png"
});

})();