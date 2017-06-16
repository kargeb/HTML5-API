(function() {

if(!"draggable" in document.createElement("span")) return;

var mario = document.querySelector("#mario"),
    dropArea = document.querySelector("#dropArea"),
    status = document.querySelector("#status"),
    counter = 1;

function setStatus(msg) {
    status.innerHTML = msg;
}

// Zdarzenia

mario.ondragstart = function(e) {
    setStatus("Rozpoczęto przeciąganie");

    e.dataTransfer.effectAllowed = "copy";
    e.dataTransfer.setData("text/html", this.outerHTML);
    e.dataTransfer.setData("text/plain", "Cześć! Jestem Mario!");
    e.dataTransfer.setData("text/custom", "A Ty?");
}

mario.ondragend = function(e) {

    if(e.dataTransfer.dropEffect == "copy") {
        mario.parentNode.removeChild(mario);

        setStatus("Przenoszenie zakończone sukcesem");
    }

}

mario.ondrag = function(e) {
    // setStatus(counter++);
}

dropArea.ondragenter = function(e) {
    setStatus("Obiekt w obszarze zrzutu");
}

dropArea.ondragleave = function(e) {
    setStatus("Obiekt opuścił obszar zrzutu");
}

dropArea.ondragover = function(e) {
    // setStatus(counter++);

    e.preventDefault();

    return false;
}

dropArea.ondrop = function(e) {
    e.preventDefault();

    if(e.dataTransfer.effectAllowed != "copy") return;

    setStatus("Element upuszczono poprawnie!");

    var data = e.dataTransfer.getData("text/html");

    dropArea.innerHTML = data;
}

})();