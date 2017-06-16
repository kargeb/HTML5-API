(function() {

var alertBox = document.querySelector("#alertBox");

// alertBox.classList.remove("alert-success");
// alertBox.classList.add("alert-danger", "klasa");
// console.log(alertBox.classList.contains("alert-danger"));

document.querySelector("#changeClass").addEventListener("click", function() {
    alertBox.classList.toggle("alert-success");
}, false);

console.log(alertBox.classList[0]);

})();