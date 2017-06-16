(function() {

function VideoPlayer(videoContainer) { // tworzymy klasę VideoPlayer

    if(!document.createElement("video").canPlayType) { // jeśli HTML5 Video nie jest wspierane
        videoContainer.querySelector(".controls").style.display = "none"; // ukrywamy kontrolki, gdyż Flash wyświetli własne

        return; // kończymy działanie funkcji
    }

    // Przypisujemy wszystkie potrzebne elementy HTML do zmiennych
    this.video = videoContainer.querySelector("video");
    this.playPause = videoContainer.querySelector(".playPause");
    this.progressBar = videoContainer.querySelector(".progressBar");
    this.loadedBar = videoContainer.querySelector(".loadedBar");
    this.playbackBar = videoContainer.querySelector(".playbackBar");
    this.currentTime = videoContainer.querySelector(".currentTime");
    this.totalTime = videoContainer.querySelector(".totalTime");
    this.fullVolume = videoContainer.querySelector(".fullVolume");
    this.currentVolume = videoContainer.querySelector(".currentVolume");

    this.setCurrentVolume(); // ustawiamy początkową głośność
    this.assignEventListeners(); // przypisujemy zdarzenia do stosownych elementów

}

VideoPlayer.prototype.assignEventListeners = function() { // metoda przypisująca zdarzenia do konkretnych elementów

    this.playPause.onclick = this.play.bind(this); // na wciśnięcie przycisku Play/Pause
    this.video.onprogress = this.updateLoadingProgress.bind(this); // na wczytywanie się wideo z serwera
    this.video.addEventListener("timeupdate", this.updatePlayingProgress.bind(this), false); // na zmianę aktualnego czasu odtwarzania (.currentTime)
    this.video.addEventListener("timeupdate", this.updateCurrentTime.bind(this), false); // na zmianę aktualnego czasu odtwarzania (.currentTime)
    this.video.ondurationchange = this.setDuration.bind(this); // na wykrycie długości całego filmu
    this.progressBar.onclick = this.setCurrentPlayback.bind(this); // na kliknięcie paska postępu
    this.fullVolume.onclick = this.adjustVolume.bind(this); // na kliknięcie paska głośności
    this.video.onvolumechange = this.setVolume.bind(this); // na zmianę głośności
    this.video.onended = this.resetPlayer.bind(this); // na zakończenie odtwarzania wideo

}

VideoPlayer.prototype.updateLoadingProgress = function() { // metoda pokazująca ilość załadowania filmu
    if(this.video.buffered.length > 0) { // jeśli cokolwiek zostało załadowane
        var percentLoaded = (this.video.buffered.end(0) / this.video.duration) * 100; // obliczamy procent załadowaia

        this.loadedBar.style.width = percentLoaded + "%"; // i przypisujemy go w CSS jako width do elementu z paskiem ładowania
    }
}

VideoPlayer.prototype.updatePlayingProgress = function() { // metoda pokazująca postęp w odtwarzaniu filmu
    var percentPlayed = (this.video.currentTime / this.video.duration) * 100; // obliczamy procent odtworzenia filmu

    this.playbackBar.style.width = percentPlayed + "%"; // i przypisujemy go w CSS jako width do elementu z paskiem postępu odtwarzania
}

VideoPlayer.prototype.play = function(e) { // metoda rozpoczynająca odtwarzania lub pauzująca film

    if(this.video.paused) { // jeśli film zapauzowany
        this.video.play(); // odtwórz

        // zmień wygląd przycisku na Pause
        e.target.classList.remove("glyphicon-play");
        e.target.classList.add("glyphicon-pause");
    } else { // w przeciwnym wypadku
        this.video.pause(); // zatrzymaj

        // zmien wygląd przycisku na Play
        e.target.classList.remove("glyphicon-pause");
        e.target.classList.add("glyphicon-play");
    }

}

VideoPlayer.prototype.formatTime = function(seconds) { // metoda formatująca czas podany w sekundach na minuty

    var seconds = Math.round(seconds), // zaokrąglamy podane sekundy np. 11.279 na 11
        minutes = Math.floor(seconds / 60), // sprawdzamy ilość minut
        remainingSeconds = seconds - minutes * 60; // odejmujemy sekundy od minut razy sekundy, dzięki czemu mamy resztę sekund

    if(remainingSeconds == 0) // jeśli pozostałych sekund jest 0
        remainingSeconds = "00"; // to dopisujemy 0 na początku
    else if(remainingSeconds < 10) // jeśli ilość sekund mniejsza niż 10
        remainingSeconds = "0" + remainingSeconds; // również dopisujemy 0 na początku

    return minutes + ":" + remainingSeconds; // zwracamy ilość minut i sekund rozdzieloną dwukropkiem
}

VideoPlayer.prototype.setDuration = function() { // metoda wstawiająca całkowity czas trwania filmu
    this.totalTime.innerHTML = this.formatTime(this.video.duration); // wstawiamy sformatowany czas do elementu HTML
}

VideoPlayer.prototype.updateCurrentTime = function() { // metoda zmieniająca aktualny czas odtwarzania
    this.currentTime.innerHTML = this.formatTime(this.video.currentTime); // wstawiamy sformatowany, aktualny czas do elementu HTML
}

VideoPlayer.prototype.setCurrentPlayback = function(e) { // metoda do przewijania za pomocą kliknięcia na pasek postępu
    var leftPos = this.progressBar.getBoundingClientRect().left, // pobieramy współrzędną x lewego brzegu paska
        clickPos = e.pageX, // miejsce kliknięcia na stronie na osi X
        pixelsFromLeft = clickPos - leftPos, // odejmujemy miejsce kliknięcia od miejsca lewego brzegu paska i wyliczamy różnicę, a więc gdzie kliknęliśmy relatywnie do paska postępu
        percent = (pixelsFromLeft / this.progressBar.offsetWidth); // wyliczamy z tego wartość np. 0.5

    var newTime = this.video.duration * percent; // obliczamy czas odtwarzania mnożąc całkowity czas (np. 14) przez powyższą wartość (np. 14 * 0.5 = 7)

    this.video.currentTime = newTime; // przypisujemy nowy czas do filmu i przeskakujemy do tego miejsca w odtwarzaniu
}

VideoPlayer.prototype.adjustVolume = function(e) { // metoda zmieniająca głośność filmu
    var leftPos = this.fullVolume.getBoundingClientRect().left, // pobieramy współrzędną x lewego brzegu paska
        clickPos = e.pageX, // miejsce kliknięcia na stronie na osi X
        pixelsFromLeft = clickPos - leftPos, // odejmujemy miejsce kliknięcia od miejsca lewego brzegu paska i wyliczamy różnicę, a więc gdzie kliknęliśmy relatywnie do paska głośności
        percent = (pixelsFromLeft / this.fullVolume.offsetWidth); // wyliczamy z tego wartość np. 0.5

    this.video.volume = percent; // przypisujemy nową wartośc głośności (pomiędzy 0.0 a 1.0)

    this.setVolume(); // wywołujemy metodę setVolume(), która na stronie zmieni wygląd paska
    // powinna być automatycznie wywołana dzięki zdarzeniu onvolumechange, jednak nie działa to w każdej przeglądarce
}

VideoPlayer.prototype.setVolume = function() { // metoda do ustawienia paska głośności na stronie
    var percent = this.video.volume * 100; // mnożymy wartość głośności (np. 0.5) przez 100, aby uzyskać procenty (np. 50)

    this.currentVolume.style.width = percent + "%"; // i przypisujemy ją w CSS jako width do elementu z paskiem głośności
}

VideoPlayer.prototype.setCurrentVolume = function() { // metoda przez moją pomyłkę, zupełnie analogiczna do powyższej setVolume
    this.currentVolume.style.width = (this.video.volume * 100) + "%";
}

VideoPlayer.prototype.resetPlayer = function() { // metoda do resetowania playera po zakończeniu odtwarzania
    // zmieniamy wygląd przycisku z Pause na Play
    this.playPause.classList.remove("glyphicon-pause");
    this.playPause.classList.add("glyphicon-play");
}

var videoPlayer1 = new VideoPlayer(document.querySelector("#videoPlayer")); // tworzymy nowy obiekt klasy VideoPlayer

})();