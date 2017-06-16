(function() {

var supportOutput = document.querySelector("#supportOutput");

if(typeof Storage !== undefined) {

    supportOutput.innerHTML = "Twoja przeglądarka wspiera Web Storage!";
    supportOutput.classList.add("alert-success");

    window.onstorage = function(e) {
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