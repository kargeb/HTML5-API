(function() {

var rangeInput = document.querySelector("#range"),
    rangeOutput = document.querySelector("#range-output"),
    colorInput = document.querySelector("#color"),
    colorOutput = document.querySelector("#color-output");

rangeInput.oninput = function(evt) { // oninput zamiast onchange pozwoli pokazywać nowe wartości w FF momencie przeciągania suwaka, a nie tylko po jego puszczeniu
    rangeOutput.value = evt.target.value; // evt.target === rangeInput lub this
}

colorInput.onchange = function(evt) {
    colorOutput.style.backgroundColor = evt.target.value; // evt.target === colorInput lub this
    colorOutput.value = evt.target.value; // .value to wartość koloru np. #ffffff
}

})();