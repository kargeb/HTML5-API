(function() {

if( !(window.history && history.pushState) ) return;

var searchInput = document.querySelector("#searchInput"),
    rows = document.querySelectorAll("#table tbody tr"),
    timer;

function filterRows() {

    [].forEach.call(rows, function(row) { // iterujemy po wszystkich elementach tr

        var cells = row.querySelectorAll("td"), // szukamy w każdym elementów td
            containsText = false; // czy podany ciąg został znaleziony w którejś z komórek? nie.

        [].forEach.call(cells, function(cell) { // iterujemy po wszystkich komórkach td
            var text = cell.textContent.toLowerCase(), // zamieniamy ich wartość tekstową na małe litery
                search = searchInput.value.toLowerCase(); // zamieniamy szukany ciąg znaków na małe litery

            if(text.indexOf(search) != -1) // jeśli w tekście komórki jest ciąg podany przez użytkownika
                containsText = true; // zmieniamy wartość zmiennej na true
        });

        if(containsText) // jeśli znaleziono tekst podany przez użytkownika
            row.style.display = ""; // pokaż wiersz
        else // w przeciwnym wypadku
            row.style.display = "none"; // ukryj wiersz

    });

}

searchInput.onkeyup = function() { // na podniesienie klawisza w polu

    clearTimeout(timer); // resetujemy timeout

    timer = setTimeout(function() { // przypisujemy timeout na 0.5 sekundy

        if(searchInput.value != "") // jeśli wpisano coś w polu wyszukiwania
            window.history.pushState(searchInput.value, "", "#search=" + encodeURI(searchInput.value)); // dodajemy wpis do historii z szukaną wartością,
            // a także zmieniamy adres URL na #search= i zakodowaną wartość podaną przez użytkownika np. Jan%20Kowalski

    }, 500);

    filterRows(); // przeszukujemy wszystkie wiersze

}

window.onpopstate = function(e) { // na wciśnięcie przycisku 'Wstecz' lub 'Do przodu' lub wczytanie strony z hashem w adresie

    if(e.state !== null) { // jeśli coś było zapisane w historii
        searchInput.value = e.state; // to wstawiamy to do pola wyszukiwania

        filterRows(); // i przeszukujemy wszystkie wiersze
    } else { // w przeciwnym wypadku
        var searchValue = window.location.hash.split("=").pop(); // pobieramy wartość za znakiem =

        searchInput.value = decodeURI(searchValue); // odkodowujemy ją i wstawiamy do pola wyszukiwania

        filterRows(); // przeszukujemy wszystkie wiersze
    }

}

})();