(function() {

if(!window.FileReader) return;

var fileInput = document.querySelector("#fileInput"),
    start = document.querySelector("#start"),
    stop = document.querySelector("#stop"),
    progress = document.querySelector("#progress");

fileInput.onchange = function() {

    var file = this.files[0],
        reader = new FileReader();

    // reader.onload = function(e) {
    //     console.log(this.result);
    // }

    // reader.readAsText(file);
    // reader.readAsBinaryString(file);

    // if(file.type.match("image.*")) {

    //     reader.onload = function() {

    //         var img = new Image();
    //         img.src = this.result;

    //         document.querySelector("#playground").appendChild(img);

    //     }

    //     reader.readAsDataURL(file);

    // }

    reader.onloadstart = function() {
        console.log("Start odczytywania. readyState: " + this.readyState);
    }

    reader.onload = function() {
        console.log("Wczytywanie zakończone sukcesem. readyState: " + this.readyState);
    }

    reader.onloadend = function() {
        console.log("Zakończono odczytywanie. readyState: " + this.readyState);
    }

    reader.onprogress = function(e) {

        if(e.lengthComputable) {
            var percent = (e.loaded / e.total) * 100;

            progress.value = percent;
        }
    }

    reader.onabort = function() {
        console.log("Przerwano odczytywanie pliku. readyState: " + this.readyState);
    }

    reader.onerror = function() {
        console.log("Wystąpił błąd" + "(" + this.error.code + "): " + this.error.message);
    }

    start.onclick = function() {
        reader.readAsBinaryString(file);
    }

    stop.onclick = function() {
        reader.abort(); // w FF nie zgłasza błędu
    }

}

})();