(function() {

if(typeof Worker == undefined) return;

// var worker = new Worker("examples/8/webworkers-example/js/worker.js");

var jsBlob = new Blob([document.querySelector("#worker").textContent], {type: "text/javascript"});

var workerURL = window.URL.createObjectURL(jsBlob);

var worker = new Worker(workerURL);

window.URL.revokeObjectURL(workerURL);

worker.addEventListener("message", function(e) {

    console.log(e.data);

}, false);

worker.postMessage("witaj!");

})();