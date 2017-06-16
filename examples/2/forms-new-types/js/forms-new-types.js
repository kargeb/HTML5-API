(function() {

var rangeInput = document.querySelector("#range"),
    rangeOutput = document.querySelector("#range-output"),
    colorInput = document.querySelector("#color"),
    colorOutput = document.querySelector("#color-output");

rangeInput.oninput = function(evt) {
    rangeOutput.value = evt.target.value;
}

colorInput.onchange = function(evt) {
    colorOutput.style.backgroundColor = evt.target.value;
    colorOutput.value = evt.target.value;
}

})();