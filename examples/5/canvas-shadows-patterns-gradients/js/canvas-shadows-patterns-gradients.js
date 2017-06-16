(function() {

if(!document.createElement("canvas").getContext) return;

var canvas = document.querySelector("#canvas"),
    ctx = canvas.getContext("2d");

// Ustawienia stylów
ctx.fillStyle = "#448af3";
ctx.strokeStyle = "#f344f1";
ctx.lineWidth = 5;

ctx.save();

// Cień

ctx.shadowColor = "rgba(0, 0, 0, .5)";
ctx.shadowOffsetX = 2;
ctx.shadowOffsetY = 2;
ctx.shadowBlur = 10;

ctx.fillRect(20, 20, 100, 100);

ctx.restore();

// Gradient Liniowy

var gradient = ctx.createLinearGradient(200, 200, 400, 400);
gradient.addColorStop(0, "red");
gradient.addColorStop(0.5, "yellow");
gradient.addColorStop(1, "blue");

ctx.fillStyle = gradient;
ctx.fillRect(200, 200, 200, 200);

// Gradient kołowy

var radialGradient = ctx.createRadialGradient(300, 120, 10, 300, 100, 50);
radialGradient.addColorStop(0, "red");
radialGradient.addColorStop(.5, "blue");
radialGradient.addColorStop(1, "green");

ctx.fillStyle = radialGradient;
ctx.arc(300, 100, 50, 0, 2 * Math.PI);
ctx.fill();

// Wzorki
var img = document.createElement("img");

    img.onload = function() {
        var pattern = ctx.createPattern(img, "repeat");

        ctx.fillStyle = pattern;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }

    img.src = "template/images/smile.png";

})();