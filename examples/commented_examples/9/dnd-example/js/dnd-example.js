(function() {

if(!"draggable" in document.createElement("span")) return;

var mario = document.querySelector("#mario"),
    dropArea = document.querySelector("#dropArea"),
    status = document.querySelector("#status"),
    counter = 1;

function setStatus(msg) {
    status.innerHTML = msg; // wyświetlamy status na stronie
}

// Zdarzenia

mario.ondragstart = function(e) { // na rozpoczęcie przeciągania
    setStatus("Rozpoczęto przeciąganie");

    e.dataTransfer.effectAllowed = "copy"; // ustawiamy dozwolony efekt
    e.dataTransfer.setData("text/html", this.outerHTML); // przypisujemy HTML elementu img z Mario
    e.dataTransfer.setData("text/plain", "Cześć! Jestem Mario!"); // przypisujemy wiadomość tekstową
    e.dataTransfer.setData("text/custom", "A Ty?"); // i kolejna wiadomośc tekstowa do przeniesienia
}

mario.ondragend = function(e) { // na zakończenie przeciągania

    if(e.dataTransfer.dropEffect == "copy") { // jeśli dozwolony efekt to copy
        mario.parentNode.removeChild(mario); // usuwamy obrazek Mario ze strony

        setStatus("Przenoszenie zakończone sukcesem"); // ustawiamy status
    }

}

mario.ondrag = function(e) { // na przeciąganie
    // setStatus(counter++);
}

dropArea.ondragenter = function(e) { // na najechanie na docelowy element
    setStatus("Obiekt w obszarze zrzutu");
}

dropArea.ondragleave = function(e) { // na wyjechanie z docelowego elementu
    setStatus("Obiekt opuścił obszar zrzutu");
}

dropArea.ondragover = function(e) { // na przeciąganie nad docelowym elementem
    // setStatus(counter++);

    e.preventDefault(); // zapobiegamy domyślnej akcji przeglądarki, dzięki czemu możemy wywołać zdarzenie ondrop

    return false; // dla pewności zwracamy false
}

dropArea.ondrop = function(e) { // na upuszczenie nad docelowym elemencie
    e.preventDefault(); // zapobiegamy domyślnej akcji przeglądarki (np. wyświetlenie obrazu)

    if(e.dataTransfer.effectAllowed != "copy") return; // jeśli dozwolony efekt był inny niż copy, kończymy

    setStatus("Element upuszczono poprawnie!");

    var data = e.dataTransfer.getData("text/html"); // zapisujemy w zmiennej przekazany kod HTML

    dropArea.innerHTML = data; // wstawiamy go do elementu docelowego wyświetlając Mario
}

})();