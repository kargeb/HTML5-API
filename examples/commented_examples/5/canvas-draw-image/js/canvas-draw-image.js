(function() {

if(!document.createElement("canvas").getContext) return;

var canvas = document.querySelector("#canvas"),
    ctx = canvas.getContext("2d"),
    giraffe = document.querySelector("#giraffe");

window.onload = function() {

    // ctx.drawImage(giraffe, 10, 10);
    // ctx.drawImage(giraffe, 10, 10, 300, 225);
    ctx.drawImage(giraffe, 200, 100, 100, 100, 50, 50, 100, 100);

    /*

    ctx.drawImage(img, x, y);

    x - współrzędna x, gdzie wstawić obraz
    y - współrzędna y, gdzie wstawić obraz

    -------------------------------------------------

    ctx.drawImage(img, x, y, w, h);

    x - współrzędna x, gdzie wstawić obraz
    y - współrzędna y, gdzie wstawić obraz
    w - szerokość wstawianego obrazu
    h - wysokość wstawianego obrazu

    -------------------------------------------------

    ctx.drawImage(img, wpx, wpy, sp, wp, x, y, w, h);

    wpx = współrzędna x przycinania na obrazku bazowym
    wpy - współrzędna y przycinania na obrazku bazowym
    sp - szerokość przycinanego kawałka na obrazku bazowym
    wp - wysokość przycinanego kawałka na obrazku bazowym
    x - współrzędna x, gdzie wstawić obraz
    y - współrzędna y, gdzie wstawić obraz
    w - szerokość wstawianego obrazu
    h - wysokość wstawianego obrazu

    */

}

})();