(function() {

if(!document.createElement("canvas").getContext) return;

var canvas = document.querySelector("#canvas"),
    ctx = canvas.getContext("2d");

var centerX = canvas.width / 2,
    centerY = canvas.height / 2;

// Ustawienia stylów
ctx.fillStyle = "#448af3";
ctx.strokeStyle = "#f344f1";
ctx.lineWidth = 2;

ctx.font = "italic 72px Arial"; // ustawienia fontu jak w CSS
ctx.textAlign = "right"; // start, end, center, left, right
ctx.textBaseline = "top"; // alphabetic, top, hanging, middle, ideographic, bottom
ctx.fillText("Test", centerX, centerY); // centerX, centerY to współrzędne gdzie ma pojawić się tekst wypełniony
ctx.strokeText("Test", centerX, centerY); // tekst jedynie obrysowany

})();