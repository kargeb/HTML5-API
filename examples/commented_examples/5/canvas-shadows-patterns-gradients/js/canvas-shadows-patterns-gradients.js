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

ctx.shadowColor = "rgba(0, 0, 0, .5)"; // również dopuszczalna notacja kolorów
ctx.shadowOffsetX = 2; // odsunięcie cienia z poziomie
ctx.shadowOffsetY = 2; // odsunięcie cienia w pionie
ctx.shadowBlur = 10; // rozmycie cienia

ctx.fillRect(20, 20, 100, 100);

ctx.restore();

// Gradient Liniowy

var gradient = ctx.createLinearGradient(200, 200, 400, 400); // tworzenie gradientu

/*

ctx.createLinearGradient(x1, y1, x2, y2);

x1 - współrzędna x, gdzie zacznie się gradient
y1 - współrzędna y, gdzie zacznie się gradient
x2 - współrzędna x, gdzie skończy się gradient
y2 - współrzędna y, gdzie skończy się gradient

*/

gradient.addColorStop(0, "red"); // dodanie koloru czerwonego na początku
gradient.addColorStop(0.5, "yellow"); // dodanie koloru żółtego w środku
gradient.addColorStop(1, "blue"); // dodanie koloru niebieskiego na końcu

ctx.fillStyle = gradient; // wypełnienie jako stworzony gradient
ctx.fillRect(200, 200, 200, 200);

// Gradient kołowy

var radialGradient = ctx.createRadialGradient(300, 120, 10, 300, 100, 50);

/*

ctx.createRadialGradient(x1, y1, r1, x2, y2, r2);

x1 - współrzędna x środka pierwszego koła
y1 - współrzędna y środka pierwszego koła
r1 - promień pierwszego koła

x2 - współrzędna x środka drugiego koła
y2 - współrzędna y środka drugiego koła
r2 - promień drugiego koła

*/

radialGradient.addColorStop(0, "red");
radialGradient.addColorStop(.5, "blue");
radialGradient.addColorStop(1, "green");

ctx.fillStyle = radialGradient;
ctx.arc(300, 100, 50, 0, 2 * Math.PI);
ctx.fill();

// Wzorki
var img = document.createElement("img"); // tworzymy nowy obiekt obrazka

    img.onload = function() { // kiedy zostanie wczytany
        var pattern = ctx.createPattern(img, "repeat"); // tworzymy nowy wzorek

        ctx.fillStyle = pattern; // przypisujemy wypełnienie na ten wzorek
        ctx.fillRect(0, 0, canvas.width, canvas.height); // wypełniamy nim cały Canvas
    }

    img.src = "template/images/smile.png"; // przypisujemy ścieżkę do obrazka do atrybutu src

})();