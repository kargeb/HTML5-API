(function() {

if(!document.createElement("canvas").getContext) return;

var canvas = document.querySelector("#canvas"),
    ctx = canvas.getContext("2d");

// Ustawienia stylów
ctx.fillStyle = "#448af3";
ctx.strokeStyle = "#f344f1";
ctx.lineWidth = 5;

ctx.fillRect(50, 50, 100, 100);

ctx.save(); // zapisujemy stan Canvasu

ctx.fillStyle = "red";

ctx.fillRect(100, 100, 100, 100);

ctx.restore(); // przywracamy zapisany wcześniej stan Canvasu

ctx.fillRect(150, 150, 100, 100);

})();