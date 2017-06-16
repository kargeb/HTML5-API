(function() {

if(!document.createElement("canvas").getContext) return;

var canvas = document.querySelector("#canvas"),
    ctx = canvas.getContext("2d");

// Gradient

var gradient = ctx.createLinearGradient(0, 0, 200, 200);
gradient.addColorStop(0, "red");
gradient.addColorStop(.5, "yellow");
gradient.addColorStop(1, "blue");

ctx.save();

ctx.translate(200, 200);

ctx.fillStyle = gradient;
ctx.fillRect(0, 0, 200, 200);

ctx.restore();

ctx.save();

ctx.scale(2, 2);

ctx.lineWidth = 10;
ctx.strokeStyle = "black";
ctx.moveTo(0, 0);
ctx.lineTo(200, 200);
ctx.stroke();

ctx.restore();

ctx.rotate(45 * Math.PI / 180);

ctx.moveTo(50, 50);
ctx.lineTo(400, 50);
ctx.stroke();


})();