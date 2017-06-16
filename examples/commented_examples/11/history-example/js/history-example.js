(function() {

if( !(window.history && history.pushState) ) return;

var info = document.querySelector("#info");

// window.history.pushState({}, "Pierwszy wpis", "/wpis-1");
// window.history.pushState(2, "Drugi wpis", "/wpis-2");

window.history.replaceState({ // zamieniamy aktualny wpis w historii na podany tutaj
    value: 0,
    title: "Zerowy wpis"
});

window.history.pushState({ // dodajemy nowy wpis do historii
    value: 1,
    title: "Pierwszy wpis"
}, "", "/wpis-1");

window.history.pushState({ // dodajemy nowy wpis do historii
    value: 2,
    title: "Drugi wpis"
}, "", "/wpis-2");

window.onpopstate = function(e) { // na wciśnięcie przycisku 'Wstecz' lub "Do przodu"

    if(e.state != null) { // jeśli zapisane dane istnieją
        info.innerHTML = "Tytuł wpisu: " + e.state.title + ", wartość: " + e.state.value; // wstawiamy ja na stronę
        document.title = e.state.title; // zmieniamy tytuł strony
    }
}

})();