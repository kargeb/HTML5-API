var ws = require("nodejs-websocket"); // importujemy moduł nodejs-websocket

var server = ws.createServer(function(conn) { // tworzymy nowy serwer i wykonujemy przekazaną funkcję dla każdego nowego podłączenia klienta

    conn.on("text", function(data) { // na otrzymanie danych z czatu

        var dataObject = JSON.parse(data); // zamieniamy string na obiekt

        if(dataObject.type == "join") { // jeśli typ to 'join'
            conn.nickName = dataObject.name; // zapisujemy w połączeniu imię użytkownika

            sendToAll({ // wysyłamy do wszystkich wiadomość, że użytkownik dołączył do czatu
                type: "status",
                message: conn.nickName + " dołączył/a do czatu."
            });
        } else if(dataObject.type == "message") { // jeśli typ to 'message'
            sendToAll({ // przekazujemy wszystkim wiadomość
                type: "message",
                name: conn.nickName, // z imieniem użytkownika, który wcześniej dołączył
                message: dataObject.message
            });
        }

    });

    conn.on("close", function() { // na zamknięcie połączenia

        if(conn.nickName) { // jeśli użytkownik wcześniej dołączył, czyli podał imię
            sendToAll({ // wysyłamy do wszystkich wiadomość, że użytkownik opuścił czat
                type: "status",
                message: conn.nickName + " opuścił/a czat."
            });
        }

    });

    conn.on("error", function(e) { // na wystąpienie błędu
        console.log("Nieoczekiwanie przerwano połączenie!"); // wyświetlamy go w konsoli systemowej (terminalu)
    });

}).listen(8000, "eduweb.dev", function() { // nasłuchujemy serwera na porcie 8000 i adresie eduweb.dev, i wykonujemy funkcję po postawieniu serwera
    console.log("Serwer aktywny!");
});

function sendToAll(data) { // funkcje wysyłająca wiadomość do wszystkich

    var msg = JSON.stringify(data); // zamieniamy przekazany obiekt na string

    server.connections.forEach(function(conn) { // iterujemy po wszystkich podłączonych klientach
        conn.sendText(msg); // i wysyłamy każdemu wiadomość
    });

}