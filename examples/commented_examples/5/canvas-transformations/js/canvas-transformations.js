(function() {

if(!document.createElement("canvas").getContext) return;

var canvas = document.querySelector("#canvas"),
    ctx = canvas.getContext("2d");

// Gradient

var gradient = ctx.createLinearGradient(0, 0, 200, 200);
gradient.addColorStop(0, "red");
gradient.addColorStop(.5, "yellow");
gradient.addColorStop(1, "blue");

ctx.save(); // zapisanie stanu Canvasu

ctx.translate(200, 200); // przesunięcie początku układu do współrzędnych 200, 200

ctx.fillStyle = gradient;
ctx.fillRect(0, 0, 200, 200);

ctx.restore(); // przywrócenie stanu Canvasu

ctx.save(); // zapisanie stanu Canvasu

ctx.scale(2, 2); // przeskalowanie całego układu dwukrotnie po osi X oraz Y

ctx.lineWidth = 10;
ctx.strokeStyle = "black";
ctx.moveTo(0, 0);
ctx.lineTo(200, 200);
ctx.stroke();

ctx.restore(); // przywrócenie stanu Canvasu

ctx.rotate(45 * Math.PI / 180); // obrócenie całego układu o 45 stopni

ctx.moveTo(50, 50);
ctx.lineTo(400, 50);
ctx.stroke();

// UWAGA!!! Jeśl użyjemy transformacji np. dwukrotnie, to są one dodawane, np. translate(200, 200), a następnie translate(100, 100),
// to druga operacja przesuwa względem wcześniej wykonanej. Podobnie z innymi transformacjami, a więc warto korzystać z .save() oraz .restore()

})();