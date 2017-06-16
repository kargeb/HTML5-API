(function() {

if( !(window.history && history.pushState) ) return;

var info = document.querySelector("#info");

// window.history.pushState({}, "Pierwszy wpis", "/wpis-1");
// window.history.pushState(2, "Drugi wpis", "/wpis-2");

window.history.replaceState({
    value: 0,
    title: "Zerowy wpis"
});

window.history.pushState({
    value: 1,
    title: "Pierwszy wpis"
}, "", "/wpis-1");

window.history.pushState({
    value: 2,
    title: "Drugi wpis"
}, "", "/wpis-2");

window.onpopstate = function(e) {

    if(e.state != null) {
        info.innerHTML = "Tytuł wpisu: " + e.state.title + ", wartość: " + e.state.value;
        document.title = e.state.title;
    }
}

})();