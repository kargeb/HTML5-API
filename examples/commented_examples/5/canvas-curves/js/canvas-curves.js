(function() {

if(!document.createElement("canvas").getContext) return;

var canvas = document.querySelector("#canvas"),
    ctx = canvas.getContext("2d");

// Ustawienia stylów
ctx.fillStyle = "#448af3";
ctx.strokeStyle = "#f344f1";
ctx.lineWidth = 5;

// Bezier Curve

ctx.save(); // zapisujemy stan Canvasu

ctx.strokeStyle = "gray";
ctx.lineWidth = 1;
ctx.moveTo(200, 200);
ctx.lineTo(250, 100);
ctx.lineTo(450, 100);
ctx.lineTo(400, 200);
ctx.stroke();

ctx.restore(); // przywracamy stan Canvasu

ctx.beginPath();
ctx.moveTo(200, 200);
ctx.bezierCurveTo(250, 100, 450, 100, 400, 200);

/*

ctx.bezierCurveTo(pk1x, pk1y, pk2x, pk2y, pkx, pky);

pk1x - współrzędna x pierwszego punktu kontrolnego
pk1y - współrzędna y pierwszego punktu kontrolnego
pk2x - współrzędna x drugiego punktu kontrolnego
pk2y - współrzędna y drugiego punktu kontrolnego
pkx - współrzędna x punktu końcowego
pky - współrzędna y punktu końcowego

*/

ctx.stroke();

// Quadratic Curve

ctx.save(); // zapisujemy stan Canvasu

ctx.strokeStyle = "gray";
ctx.lineWidth = 1;
ctx.moveTo(50, 300);
ctx.lineTo(150, 200);
ctx.lineTo(350, 300);
ctx.stroke();

ctx.restore(); // przywracamy stan Canvasu

ctx.beginPath();
ctx.moveTo(50, 300);
ctx.quadraticCurveTo(150, 200, 350, 300);

/*

ctx.quadraticCurveTo(pk1x, pk1y, pkx, pky);

pk1x - współrzędna x punktu kontrolnego
pk1y - współrzędna y punktu kontrolnego
pkx - współrzędna x punktu końcowego
pky - współrzędna y punktu końcowego

*/

ctx.stroke();

})();