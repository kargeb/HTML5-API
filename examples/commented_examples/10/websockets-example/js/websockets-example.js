(function() {

if(!window.WebSocket) return;

var socket = new WebSocket("ws://echo.websocket.org"), // tworzymy nowy WebSocket podając adres serwera
    info = document.querySelector("#info");

socket.onopen = function(e) { // na otwarcie połączenia z serwerem
    info.innerHTML = "Połączenie z serwerem nawiązane.";

    socket.send("Witam Cię!"); // wysyłamy do serwera wiadomość

    console.log(socket);
}

socket.onmessage = function(e) { // na otrzymanie wiadomości z serwera
    info.innerHTML = "Wiadomość z serwera: " + e.data; // wyświetlamy ją na stronie
    // socket.close(); // zamykamy połączenie z serwerem
}

socket.onclose = function(e) { // na zamknięcie połączenia z serwerem
    // info.innerHTML = "Połączenie z serwerem zakończone.";
}

})();