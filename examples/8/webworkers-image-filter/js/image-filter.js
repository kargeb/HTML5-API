self.addEventListener("message", function(e) {

    var canvasData = e.data,
        length = canvasData.data.length;

    for(var j = 0; j < 1000; j++) {

        for(var i = 0; i < length; i += 4) {

            var r = 0.025 * canvasData.data[i] + 0.126 * canvasData.data[i + 1] + 0.068 * canvasData.data[i + 2];
            var g = 0.099 * canvasData.data[i] + 0.163 * canvasData.data[i + 1] + 0.071 * canvasData.data[i + 2];
            var b = 0.056 * canvasData.data[i] + 0.222 * canvasData.data[i + 1] + 0.999 * canvasData.data[i + 2];

            canvasData.data[i] = r;
            canvasData.data[i + 1] = g;
            canvasData.data[i + 2] = b;

        }

    }

    self.postMessage(canvasData);

}, false);