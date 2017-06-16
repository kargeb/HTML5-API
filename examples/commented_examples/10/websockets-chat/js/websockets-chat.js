(function() {

var chat = { // tworzymy obiekt, w którym zamkniemy wszystkie metody

    renderRow: function(dataObject) { // metoda renderująca kod HTML dla wiersza w czacie

        var chatRow = document.createElement("div"), // tworzymy element div
            date = new Date(), // pobieramy aktualną datę
            time = date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds(), // zapisujemy ją w formacie hh:mm:ss
            message;

        chatRow.classList.add("chatRow"); // dodajemy do diva klasę chatRow

        if(dataObject.type == "status") // jeśli właściwość type w przekazanym obiekcie to 'status'
            message = "<span class='status'>" + dataObject.message + "</span>";
        else // w przeciwnym wypadku
            message = "<span class='name'>" + dataObject.name + "</span><span class='message'>" + dataObject.message + "</span>";

        chatRow.innerHTML = "<span class='time'>" + time + "</span>\n" + message; // wstawiamy do diva czas i wiadomość

        this.chatWindow.appendChild(chatRow); // wstawiamy diva na stronę
        this.chatWindow.scrollTop = this.chatWindow.scrollHeight; // przesuwamy pasek przewijania okienka czatu na sam dół

    },

    sendData: function(msgObject) { // metoda wysyłająca dane na serwer

        var data = JSON.stringify(msgObject); // zamieniamy przekazany obiekt na string

        this.socket.send(data); // i wysyłamy go na serwer

    },

    displayMessage: function(e) { // metoda wyświetlająca otrzymane dane

        var dataObject = JSON.parse(e.data); // zamieniamy otrzymany string na obiekt

        this.renderRow(dataObject); // wstawiamy wiersz z informacją na stronę

    },

    sendMessage: function() { // metoda przekazująca do wysłania wiadomość wpisaną w czacie

        var message = this.messageInput.value; // treść pola textarea

        if(message !== "") { // jeśli cokolwiek wpisano
            this.sendData({ // przekazujemy do wysłania z typem 'message'
                type: "message",
                message: message
            });

            this.messageInput.value = ""; // resetujemy wartość pola textarea
        }

    },

    joinToChat: function(e) { // metoda dołączająca użytkownika do czatu

        var name = this.nameInput.value; // wartość pola a nickiem użytkownika

        if(name !== "") { // jeżeli cokolwiek wpisano
            this.sendData({ // przekazujemy do wysłania z typem 'join'
                type: "join",
                name: name
            });

            e.target.onclick = null; // usuwamy zdarzenie onclick przycisku
            e.target.setAttribute("disabled", "disabled"); // i zaznaczamy go jako nieaktywny
            this.nameInput.setAttribute("readonly", "readonly"); // do pola z imieniem przypisujemy atrybut readonly

            this.submitButton.removeAttribute("disabled"); // odblokowujemy przycisk do wysyłania wiadomości
            this.submitButton.onclick = this.sendMessage.bind(this); // i przypisujemy mu zdarzenie onclick na wysłanie wiadomości
        }

    },

    stopApp: function() { // metoda zatrzymująca działanie aplikacji

        this.joinButton.onclick = null; // usuwamy zdarzenie onclick przycisku
        this.joinButton.setAttribute("disabled", "disabled"); // i zaznaczamy go jako nieaktywny

        this.submitButton.onclick = null; // usuwamy zdarzenie onclick przycisku
        this.submitButton.setAttribute("disabled", "disabled"); // i zaznaczamy go jako nieaktywny

        this.renderRow({ // wstawiamy wiersz z komunikatem
            type: "status",
            message: "Przerwano połączenie z serwerem."
        });

    },

    connectToServer: function() { // metoda podłączająca do serwera

        this.socket = new WebSocket("ws://eduweb.dev:8000"); // tworzymy nowy WebSocket
        this.socket.onmessage = this.displayMessage.bind(this); // na przysłanie danych z serwera
        this.socket.onclose = this.stopApp.bind(this); // na zakończenie połączenia

    },

    init: function() { // metoda inicjująca aplikację

        if(!window.WebSocket) return; // jeśli brak wsparcia dla WebSocket, kończymy działanie funkcji

        this.nameInput = document.querySelector("#yourName");
        this.joinButton = document.querySelector("#join");
        this.chatWindow = document.querySelector("#chatWindow");
        this.messageInput = document.querySelector("#message");
        this.submitButton = document.querySelector("#submit");

        this.joinButton.onclick = this.joinToChat.bind(this); // na kliknięcie przycisku 'Dołącz'

        this.connectToServer(); // podłączamy się do serwera

    }

}

chat.init(); // uruchomienie aplikacji

})();