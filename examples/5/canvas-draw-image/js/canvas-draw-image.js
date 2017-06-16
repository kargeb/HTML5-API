(function() {

if(!document.createElement("canvas").getContext) return;

var canvas = document.querySelector("#canvas"),
    ctx = canvas.getContext("2d"),
    giraffe = document.querySelector("#giraffe");

window.onload = function() {

    // ctx.drawImage(giraffe, 10, 10);
    // ctx.drawImage(giraffe, 10, 10, 300, 225);
    ctx.drawImage(giraffe, 200, 100, 100, 100, 50, 50, 100, 100);

}

})();