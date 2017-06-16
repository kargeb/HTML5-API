(function() {

var supportOutput = document.querySelector("#supportOutput"),
    positionOutput = document.querySelector("#positionOutput"),
    findPositionButton = document.querySelector("#findPosition");

if(!navigator.geolocation) { // jeśli w obiekcie navigator znajduje się obiekt geolocation to mamy wsparcie
    supportOutput.innerHTML = "Twoja przeglądarka nie wspiera Geolokalizacji!";
    supportOutput.classList.add("alert-danger");
} else {
    supportOutput.innerHTML = "Twoja przeglądarka wspiera Geolokalizację!";
    supportOutput.classList.add("alert-success");
}

function geoSuccess(position) { // funkcja wykonywana, gdy uda się pobrać pozycję
    positionOutput.innerHTML = "Twoja pozycja to: " + position.coords.latitude + "," + position.coords.longitude; // latitude - szerokość, longitude - długość geograficzna
    // polecam wyświetlenie position w konsoli poprzez console.log(position) i przyjrzenie się pozostałym właściwościom
}

function geoError(errorObj) { // funkcja wykonywana, gdy wystąpił jakiś bląd

    var errorMessage;

    switch(errorObj.code) { // .code to kod błedu, możemy go porównać do:
        case errorObj.PERMISSION_DENIED :
            errorMessage = "Brak pozwolenia na znalezienie lokalizacji.";
            break;

        case errorObj.POSITION_UNAVAILABLE :
            errorMessage = "Brak dostępu do sieci.";
            break;

        case errorObj.TIMEOUT :
            errorMessage = "Przekroczono czas oczekiwania.";
            break;
    }

    positionOutput.innerHTML = "<strong>Wystąpił błąd: </strong>" + errorMessage;

}

var options = { // opcje przekazywane przy pobieraniu pozycji
    timeout: 500 // można podać jeszcze enagleHighAccuracy: true/false oraz maximumAge: jako liczba (domyślnie Infinity)
}

findPositionButton.onclick = function() { // po wciśnięciu przycisku

    positionOutput.innerHTML = "Czekaj...";

    navigator.geolocation.getCurrentPosition(geoSuccess, geoError, options); // pobieramy pozycję i przekazujemy funkcje oraz opcje do .getCurrentPosition

}

})();