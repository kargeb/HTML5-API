(function() {
 
if(!window.FileReader) return;

    
    
var fileInput = document.querySelector("#fileInput");

fileInput.onchange = function() { // po wybraniu pliku przez użytkownika
    var file = this.files[0]; // zapisujemy odwołanie do niego w zmiennej

    document.querySelector("#fileName").innerHTML = "Nazwa: " + file.name;
    document.querySelector("#fileSize").innerHTML = "Rozmiar: " + file.size;
    document.querySelector("#fileType").innerHTML = "Typ: " + file.type;
    document.querySelector("#fileLastModifiedDate").innerHTML = "Ostatnio zmodyfikowany: " + file.lastModifiedDate.toLocaleDateString();
    // .toLocaleDateString() sformatuje w czytelny sposób pobraną datę
}

})();