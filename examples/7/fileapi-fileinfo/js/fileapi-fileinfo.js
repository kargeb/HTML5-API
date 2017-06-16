(function() {

if(!window.FileReader) return;

var fileInput = document.querySelector("#fileInput");

fileInput.onchange = function() {
    var file = this.files[0];

    document.querySelector("#fileName").innerHTML = "Nazwa: " + file.name;
    document.querySelector("#fileSize").innerHTML = "Rozmiar: " + file.size;
    document.querySelector("#fileType").innerHTML = "Typ: " + file.type;
    document.querySelector("#fileLastModifiedDate").innerHTML = "Ostatnio zmodyfikowany: " + file.lastModifiedDate.toLocaleDateString();
}

})();