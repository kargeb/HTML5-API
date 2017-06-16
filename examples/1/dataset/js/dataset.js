(function() {

var tooltip = document.querySelector("button[data-toggle='tooltip']");

// console.log(tooltip.dataset.placement);

tooltip.dataset.placement = "bottom";

// tooltip.removeAttribute("data-placement");
// delete tooltip.dataset.placement;
tooltip.dataset.title = "Wartość";

$(tooltip).data("placement", "top");

// Uruchomienie pluginu jQuery
$(tooltip).tooltip();

})();