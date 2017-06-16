(function() {

var tooltip = document.querySelector("button[data-toggle='tooltip']"); // nawiasy kwadratowe odwołują się do atrybutu

// console.log(tooltip.dataset.placement);

tooltip.dataset.placement = "bottom";

// tooltip.removeAttribute("data-placement");
// delete tooltip.dataset.placement;
tooltip.dataset.title = "Wartość";

$(tooltip).data("placement", "top"); // aby korzystać z metod jQuery, należy zawrzeć obiekt w funkcji dolara $

// Uruchomienie pluginu jQuery
$(tooltip).tooltip();

})();