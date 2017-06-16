(function() {

var supportOutput = document.querySelector("#supportOutput");

if(typeof Storage !== undefined) { // jeśli obiekt Storage nie jest równy undefined, to znaczy że mamy wsparcie
    // alternatywnie można użyć if(window.localStorage && window.sessionStorage)

    supportOutput.innerHTML = "Twoja przeglądarka wspiera Web Storage!";
    supportOutput.classList.add("alert-success");

    window.onstorage = function(e) { // przy zmianie czegoś w localStorage
        console.log(e);
    }

    // window.localStorage.setItem("imie", "Ania");
    window.localStorage.imie = "Maciej";
    // window.localStorage["imie"] = "Tomasz";

    // console.log(window.localStorage);

    // window.sessionStorage.setItem("wiek", 20);

    console.log(window.localStorage);

} else {

    supportOutput.innerHTML = "Twoja przeglądarka nie wspiera Web Storage!";
    supportOutput.classList.add("alert-danger");

}

})();