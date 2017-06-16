(function() {

if(!document.createElement("canvas").getContext) return;

var canvases = document.querySelectorAll(".canvas"),
    globalCompositeOperations = [
        "source-over",
        "source-in",
        "source-out",
        "source-atop",
        "destination-over",
        "destination-in",
        "destination-out",
        "destination-atop",
        "lighter",
        "darker",
        "copy",
        "xor"
    ];

var alpha = 1.0;

for(var i = 0; i < canvases.length; i++) {

    var ctx = canvases[i].getContext("2d");

    ctx.fillStyle = "blue";
    ctx.fillRect(40, 40, 100, 100);

    ctx.globalCompositeOperation = globalCompositeOperations[i]; // ustawienie jednego z trybów

    ctx.globalAlpha = alpha -= 0.05; // ustawienie przezroczystości

    ctx.fillStyle = "red";
    ctx.fillRect(90, 90, 100, 100);

    ctx.globalCompositeOperation = "source-over"; // domyślny tryb globalCompositeOperation

    ctx.font = "16px Arial";
    ctx.textAlign = "right";
    ctx.textBaseline = "bottom";
    ctx.fillStyle = "black";
    ctx.fillText(globalCompositeOperations[i], 250, 250);

}

})();