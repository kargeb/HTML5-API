(function() {

var supportOutput = document.querySelector("#supportOutput"),
    positionOutput = document.querySelector("#positionOutput"),
    findPositionButton = document.querySelector("#findPosition");

if(!navigator.geolocation) {
    supportOutput.innerHTML = "Twoja przeglądarka nie wspiera Geolokalizacji!";
    supportOutput.classList.add("alert-danger");
} else {
    supportOutput.innerHTML = "Twoja przeglądarka wspiera Geolokalizację!";
    supportOutput.classList.add("alert-success");
}

function geoSuccess(position) {
    positionOutput.innerHTML = "Twoja pozycja to: " + position.coords.latitude + "," + position.coords.longitude;
}

function geoError(errorObj) {

    var errorMessage;

    switch(errorObj.code) {
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

var options = {
    timeout: 500
}

findPositionButton.onclick = function() {

    positionOutput.innerHTML = "Czekaj...";

    navigator.geolocation.getCurrentPosition(geoSuccess, geoError, options);

}

})();
