(function() {

if(!document.createElement("canvas").getContext) return;

var canvas = document.querySelector("#canvas"),
    ctx = canvas.getContext("2d");

function radians(degrees) { // funkcja konwertująca stopnie na radiany
    return degrees * Math.PI / 180;
}

// Ustawienia stylów
ctx.fillStyle = "#448af3";
ctx.strokeStyle = "#f344f1";
ctx.lineWidth = 5;

// ctx.beginPath();
// ctx.moveTo(50, 50);
// ctx.arcTo(180, 50, 180, 200, 120);
// ctx.stroke();

ctx.beginPath();
ctx.arc(canvas.width / 2, canvas.height / 2, 50, 0, radians(180));
ctx.closePath();
ctx.stroke();
// ctx.fill();

})();