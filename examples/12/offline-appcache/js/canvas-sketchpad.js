(function() {

if(!document.createElement("canvas").getContext) return;

var sketchpad = {

    saveImage: function() {

        var img = new Image();
        img.src = this.canvas.toDataURL("image/png");

        this.con.appendChild(img);

    },

    clearCanvas: function() {

        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    },

    drawLines: function(e) {

        if(!this.mouseDown) return;

        var x = this.getX(e),
            y = this.getY(e);

        this.ctx.lineTo(x, y);
        this.ctx.stroke();

    },

    enableDrawing: function(e) {

        this.mouseDown = true;

        this.ctx.beginPath();
        this.ctx.moveTo(this.getX(e), this.getY(e));

    },

    disableDrawing: function(e) {

        this.mouseDown = false;

    },

    getX: function(e) {

        var boundries = this.canvas.getBoundingClientRect();

        if(e.offsetX) {
            return e.offsetX;
        } else if(e.clientX) {
            return e.clientX - boundries.left;
        }

    },

    getY: function(e) {

        var boundries = this.canvas.getBoundingClientRect();

        if(e.offsetY) {
            return e.offsetY;
        } else if(e.clientY) {
            return e.clientY - boundries.top;
        }

    },

    changePenColor: function(e) {

        this.con.querySelector(".current").classList.remove("current");
        e.target.classList.add("current");

        this.ctx.strokeStyle = e.target.dataset.color;

    },

    changePenSize: function(penSize) {

        this.ctx.lineWidth = penSize;

    },

    setupSidebar: function() {

        [].forEach.call(this.colors, function(color) {
            color.style.backgroundColor = color.dataset.color;

            color.onclick = this.changePenColor.bind(this);
        }.bind(this));

        this.range.oninput = function(e) {
            this.rangeOutput.innerHTML = e.target.value;

            this.changePenSize(e.target.value);
        }.bind(this);

        this.clearButton.onclick = this.clearCanvas.bind(this);
        this.saveButton.onclick = this.saveImage.bind(this);

    },

    setupCanvas: function() {

        this.canvas.width = this.canvasCon.offsetWidth;
        this.canvas.height = this.canvasCon.offsetHeight;
        this.mouseDown = false;

        this.ctx = this.canvas.getContext("2d");

        this.ctx.fillStyle = "#fff";
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.lineWidth = this.range.value;
        this.ctx.lineJoin = "round";
        this.ctx.lineCap = "round";
        this.ctx.strokeStyle = this.con.querySelector(".current").dataset.color;

        this.canvas.onmousemove = this.drawLines.bind(this);
        this.canvas.onmousedown = this.enableDrawing.bind(this);
        this.canvas.onmouseup = this.disableDrawing.bind(this);

    },

    init: function() {

        this.con = document.querySelector("#sketchpad");
        this.canvasCon = this.con.querySelector(".canvas");
        this.canvas = this.con.querySelector("canvas");

        this.colors = this.con.querySelectorAll(".colors div");
        this.range = this.con.querySelector("input[type='range']");
        this.rangeOutput = this.con.querySelector("output strong");

        this.clearButton = this.con.querySelector("#clear");
        this.saveButton = this.con.querySelector("#save");

        this.setupCanvas();
        this.setupSidebar();

    }

}

sketchpad.init();

})();