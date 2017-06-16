(function() {

if(!document.createElement("canvas").getContext) return;

var canvas = document.querySelector("#canvas"),
    ctx = canvas.getContext("2d");

// Ustawienia stylów
ctx.fillStyle = "#448af3";
ctx.strokeStyle = "#f344f1";
ctx.lineWidth = 5;

// Bezier Curve

ctx.save();

ctx.strokeStyle = "gray";
ctx.lineWidth = 1;
ctx.moveTo(200, 200);
ctx.lineTo(250, 100);
ctx.lineTo(450, 100);
ctx.lineTo(400, 200);
ctx.stroke();

ctx.restore();

ctx.beginPath();
ctx.moveTo(200, 200);
ctx.bezierCurveTo(250, 100, 450, 100, 400, 200);
ctx.stroke();

// Quadratic Curve

ctx.save();

ctx.strokeStyle = "gray";
ctx.lineWidth = 1;
ctx.moveTo(50, 300);
ctx.lineTo(150, 200);
ctx.lineTo(350, 300);
ctx.stroke();

ctx.restore();

ctx.beginPath();
ctx.moveTo(50, 300);
ctx.quadraticCurveTo(150, 200, 350, 300);
ctx.stroke();



})();