(function() {

function VideoPlayer(videoContainer) {

    if(!document.createElement("video").canPlayType) {
        videoContainer.querySelector(".controls").style.display = "none";

        return;
    }

    this.video = videoContainer.querySelector("video");
    this.playPause = videoContainer.querySelector(".playPause");
    this.progressBar = videoContainer.querySelector(".progressBar");
    this.loadedBar = videoContainer.querySelector(".loadedBar");
    this.playbackBar = videoContainer.querySelector(".playbackBar");
    this.currentTime = videoContainer.querySelector(".currentTime");
    this.totalTime = videoContainer.querySelector(".totalTime");
    this.fullVolume = videoContainer.querySelector(".fullVolume");
    this.currentVolume = videoContainer.querySelector(".currentVolume");

    this.setCurrentVolume();
    this.assignEventListeners();

}

VideoPlayer.prototype.assignEventListeners = function() {

    this.playPause.onclick = this.play.bind(this);
    this.video.onprogress = this.updateLoadingProgress.bind(this);
    this.video.addEventListener("timeupdate", this.updatePlayingProgress.bind(this), false);
    this.video.addEventListener("timeupdate", this.updateCurrentTime.bind(this), false);
    this.video.ondurationchange = this.setDuration.bind(this);
    this.progressBar.onclick = this.setCurrentPlayback.bind(this);
    this.fullVolume.onclick = this.adjustVolume.bind(this);
    this.video.onvolumechange = this.setVolume.bind(this);
    this.video.onended = this.resetPlayer.bind(this);

}

VideoPlayer.prototype.updateLoadingProgress = function() {
    if(this.video.buffered.length > 0) {
        var percentLoaded = (this.video.buffered.end(0) / this.video.duration) * 100;

        this.loadedBar.style.width = percentLoaded + "%";
    }
}

VideoPlayer.prototype.updatePlayingProgress = function() {
    var percentPlayed = (this.video.currentTime / this.video.duration) * 100;

    this.playbackBar.style.width = percentPlayed + "%";
}

VideoPlayer.prototype.play = function(e) {

    if(this.video.paused) {
        this.video.play();

        e.target.classList.remove("glyphicon-play");
        e.target.classList.add("glyphicon-pause");
    } else {
        this.video.pause();

        e.target.classList.remove("glyphicon-pause");
        e.target.classList.add("glyphicon-play");
    }

}

VideoPlayer.prototype.formatTime = function(seconds) {

    var seconds = Math.round(seconds),
        minutes = Math.floor(seconds / 60),
        remainingSeconds = seconds - minutes * 60;

    if(remainingSeconds == 0)
        remainingSeconds = "00";
    else if(remainingSeconds < 10)
        remainingSeconds = "0" + remainingSeconds;

    return minutes + ":" + remainingSeconds;
}

VideoPlayer.prototype.setDuration = function() {
    this.totalTime.innerHTML = this.formatTime(this.video.duration);
}

VideoPlayer.prototype.updateCurrentTime = function() {
    this.currentTime.innerHTML = this.formatTime(this.video.currentTime);
}

VideoPlayer.prototype.setCurrentPlayback = function(e) {
    var leftPos = this.progressBar.getBoundingClientRect().left,
        clickPos = e.pageX,
        pixelsFromLeft = clickPos - leftPos,
        percent = (pixelsFromLeft / this.progressBar.offsetWidth);

    var newTime = this.video.duration * percent;

    this.video.currentTime = newTime;
}

VideoPlayer.prototype.adjustVolume = function(e) {
    var leftPos = this.fullVolume.getBoundingClientRect().left,
        clickPos = e.pageX,
        pixelsFromLeft = clickPos - leftPos,
        percent = (pixelsFromLeft / this.fullVolume.offsetWidth);

    this.video.volume = percent;

    this.setVolume();
}

VideoPlayer.prototype.setVolume = function() {
    var percent = this.video.volume * 100;

    this.currentVolume.style.width = percent + "%";
}

VideoPlayer.prototype.setCurrentVolume = function() {
    this.currentVolume.style.width = (this.video.volume * 100) + "%";
}

VideoPlayer.prototype.resetPlayer = function() {
    this.playPause.classList.remove("glyphicon-pause");
    this.playPause.classList.add("glyphicon-play");
}

var videoPlayer1 = new VideoPlayer(document.querySelector("#videoPlayer"));

})();