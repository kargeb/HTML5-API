(function() {

if(!document.createElement("canvas").getContext) return;

var canvas = document.querySelector("#canvas"),
    ctx = canvas.getContext("2d"),
    giraffe = document.querySelector("#giraffe");

window.onload = function() {

    ctx.beginPath();
    ctx.arc(canvas.width / 2, canvas.height / 2, 120, 0, 2 * Math.PI);
    ctx.rect(canvas.width / 2, canvas.height / 2, 200, 100);
    ctx.clip();
    ctx.drawImage(giraffe, 0, 0);

}

})();