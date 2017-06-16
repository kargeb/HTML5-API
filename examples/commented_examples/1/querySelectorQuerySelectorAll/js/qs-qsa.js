(function() {

// Rozszerzenie prototypu klasy NodeList, dzięki czemu możemy korzystać z dodawania styli CSS poprzez metodę .css
NodeList.prototype.css = function(propertyOrObject, value) { // podajemy obiekt z właściwościami i ich wartościami, lub jedną właściwość, a jako drugi parametr jej wartość

    Array.prototype.forEach.call(this, function(elem) { // iterujemy po wszystkich elementach w kolekcji

        if(typeof propertyOrObject === "object") { // jeśli pierwszy podany parametr to obiekt
            var cssObject = propertyOrObject; // zapisujemy go w zmiennej

            for(var prop in cssObject) { // iterujemy po całym obiekcie
                elem.style[prop] = cssObject[prop]; // i przypisujemy właściwość CSS i jej wartość
            }
        } else if(typeof propertyOrObject === "string" && value !== undefined) { // jeśli podana została właściwość i jej wartość
            var prop = propertyOrObject; // zapisujemy właściwość w zmiennej

            elem.style[prop] = value; // i przypisujemy ją w CSS z podaną jako drugi parametr wartością
        } else {
            throw new Error("Podano złe parametry!"); // w przeciwnym wypadku zgłaszamy błąd, który będzie widoczny w konsoli przeglądarki
        }

    });

    return this; // zwracamy kolekcję elementów, byśmy mogli po kropce wykonywać na niej kolejne metody

}

var list = document.querySelector("#list");

var listItems = list.querySelectorAll("li:nth-child(even)"); // pobiera wszystkie elementy li w kolejności, które są parzyste

listItems.css("background-color", "yellow");

document.querySelectorAll("input:checked").css("margin-right", "50px"); // wybiera element input o typie checkbox, który jest w tym momencie zaznaczony

document.querySelectorAll("a[href$='.pdf']").css("text-transform", "uppercase"); // wybiera wszystkie elementy a, z atrybutem href kończącym się na .pdf

})();