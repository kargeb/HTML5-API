(function() {

function Validator(form) { // tworzymy klasę Validator
    this.form = form; // przypisujemy do nowo stworzonego obiektu zmienną form, która wskazuje na przekazany formularz
    this.fields = this.form.querySelectorAll("[required]"); // szukamy wszystkich pól z atrybutem required w formularzu i zapisujemy do zmiennej fields
    this.errors = []; // pusta tablica błędów, którą później uzupełnimy
    this.errorsList = this.form.querySelector(".alert ol"); // element ol znajdujący się w formularzu

    if(!this.fields.length) return; // jeśli nie ma żadnych pól z atrybutem required, kończymy funkcję poprzez return

    this.form.onsubmit = function(e) { // przypisujemy zdarzenie submit dla formularza
        e.preventDefault(); // aby nie został wysłany, zatrzymujemy domyślną akcję przeglądarki

        var formValid = this.validate(); // wywołujemy metodę .validate, która zwróci true lub false

        if(formValid) { // jeśli true, to brak błędów
            this.form.submit(); // i możemy wysłać
        } else { // jeśli false
            return false; // zwracamy false i tym samym nie wysyłamy, można teraz poprawić błędy na stronie
        }

    }.bind(this); // dzięki .bind(this) wewnątrz funkcji obsługi zdarzenia onsubmit słowo kluczowe this będzie wskazywało na stworzony obiekt, a nie na formularz
}

Validator.prototype.validate = function() { // rozszerzamy prototyp klasy o metodę validate
    this.clearErrors(); // czyścimy błędy, które mogły być wcześniej wyświetlone i wstawione do tablicy errors

    for(var i = 0; i < this.fields.length; i++) { // iterujemy po wszystkich polach
        this.validateField(this.fields[i]); // i na każdym wywołujemy metodę .validateField, której przekazujemy dane pole
    }

    if(!this.errors.length) { // jeśli po iteracji tablica błędów nie została niczym uzupełniona
        return true; // możemy zwrócić true, bo nie ma żadnych błędów
    } else { // jeśli wystąpiły błędy walidacji
        this.showErrors(); // pokazujemy je na stronie poprzez metodę .showErrors
        return false; // i zwracamy false, dzięki czemu formularz nie zostanie wysłany
    }
}

Validator.prototype.validateField = function(field) { // metoda do walidacji konkretnego pola, przyjmuje go jako parametr
    var fieldValid = field.validity.valid; // właściwość .validity.valid zwróci true lub false, w zależności czy pole jest poprawnie uzupełnione czy też nie

    if(fieldValid) { // jeśli poprawnie uzupełnione
        this.markAsValid(field); // to oznaczamy pole na zielono
    } else { // jeśli nie
        this.errors.push(field.dataset.errorMessage); // wstawiamy komunikat z atrybutu data-error-message pola do tablicy błędów
        this.markAsInvalid(field); // i zaznaczamy pole na czerwono
    }
}

Validator.prototype.markAsValid = function(field) {
    field.classList.remove("invalid"); // klasa z czerwoną obramówką
    field.classList.add("valid"); // klasa z zielona obramówką
}

Validator.prototype.markAsInvalid = function(field) {
    field.classList.remove("valid"); // klasa z zielona obramówką
    field.classList.add("invalid"); // klasa z czerwoną obramówką
}

Validator.prototype.showErrors = function() { // metoda do wyświetlania błędów na stronie
    var errorsListElements = document.createDocumentFragment(); // tworzymy fragment dokumentu, do którego można dodawać kolejne elementy

    for(var i = 0; i < this.errors.length; i++) { // iterujemy po całej tablicy błędów
        var liEl = document.createElement("li"); // tworzymy element li

            liEl.textContent = this.errors[i]; // ustawiamy jego treść tekstową na komunikat, który był w tablicy błędów (dodany tam z data-error-message pola)
            errorsListElements.appendChild(liEl); // wstawiamy element li do fragmentu dokumentu
    }

    this.errorsList.appendChild(errorsListElements); // wstawiamy fragment dokumentu z elementami li do elementu ol zapisanego w zmiennej na górze
    this.errorsList.parentNode.style.display = "block"; // pokazujemy div, który zawiera ol, poprzez ol.parentNode i nadaniu mu display: block;
}

Validator.prototype.clearErrors = function() { // metoda do czysczenia błędów
    this.errors.length = 0; // usuwamy wszystko z tablicy błędów
    this.errorsList.parentNode.style.display = "none"; // element div zawierający listę ol ukrywamy
    this.errorsList.innerHTML = ""; // usuwamy z listy ol wszystkie elementy li
}

var validator1 = new Validator(document.querySelector("#form")); // tworzymy nowy obiekt klasy Validator przekazując jej element form

})();