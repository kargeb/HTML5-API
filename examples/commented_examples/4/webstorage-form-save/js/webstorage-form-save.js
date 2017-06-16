(function() {

function FormSaver(form) { // tworzymy klasę FormSaver
    this.form = form; // zapisujemy w nowo tworzonym obiekcie przekazany formularz
    this.fields = this.form.querySelectorAll("input[name]:not([type='submit'])"); // zapisujemy wszystkie pola z atrybutem name, ale nie pole typu submit
    this.formID = this.form.getAttribute("id"); // zapisujemy atrybut ID formularza
    this.fieldsValues = {}; // obiekt, który uzupełnimy danymi później

    this.loadFieldsValues(); // jeśli zostały zapisane wcześniej dane z formularza, wczytujemy je tutaj

    this.addSavingToFields(); // przypisujemy zdarzenia do pól formularza

    this.form.onsubmit = this.clearLocalStorage.bind(this); // przy wysłaniu formularza, czyścimy localStorage
}

FormSaver.prototype.addSavingToFields = function() { // metoda dodająca zdarzenia do pól formularza

   for(var i = 0; i < this.fields.length; i++) { // iterujemy przez wszystkie zapisane pola

        this.fields[i].onchange = this.saveField.bind(this); // i każdemu dodajemy na zdarzenie onchange funkcję saveField

    }

}

FormSaver.prototype.saveField = function(e) { // metoda zapisująca wartość pola

    var that = e.target; // pole, na którym wywołane zostało zdarzenie onchange

    this.fieldsValues[that.getAttribute("name")] = that.value; // w obiekcie fieldsValues zapisujemy jako klucz/wartość atrybut name pola i jego aktualną wartość

    this.saveToLocalStorage(); // obiekt fieldsValues serializujemy i zapisujemy do localStorage

}

FormSaver.prototype.saveToLocalStorage = function() { // metoda zapisująca obiekt fieldsValues do localStorage

    window.localStorage.setItem(this.formID, JSON.stringify(this.fieldsValues)); // zapisujemy obiekt jako klucz/wartośc, klucz to ID formularza, a wartość to zamieniony na string obiekt, poprzez JSON.stringify(obiekt)

}

FormSaver.prototype.clearLocalStorage = function(e) { // metoda czyszcząca localStorage

    e.preventDefault(); // aby formularz nie został wysłany, w Twoim przypadku powinno tego nie być

    window.localStorage.removeItem(this.formID); // usuwamy z localStorage dane przypisane poprzez ID formularza

}

FormSaver.prototype.loadFieldsValues = function() { // metoda uzupełniająca wcześniej zapisane pola formularza

    var savedFields = window.localStorage[this.formID]; // zapisujemy do zmiennej dane z localStorage

    if(savedFields) { // jeśli coś się tam znajdowało

        savedFields = JSON.parse(savedFields); // zamieniamy string na obiekt

        for(var key in savedFields) { // iterujemy po całym obiekcie

            this.form.querySelector("[name='" + key + "']").value = savedFields[key]; // szukamy pola z podanym atrubutem name i przypisujemy mu zapisaną wartość

        }

    }

}

if("localStorage" in window) { // jeśli mamy wsparcie dla localStorage
    var formToSave = new FormSaver(document.querySelector("#form")); // tworzymy nowy obiekt klasy FormSaver
}

})();