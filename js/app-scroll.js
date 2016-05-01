
console.log('begin');

var frameNumber = 0,
    playbackConst = 400,  // lower numbers = faster playback
    setHeight = document.getElementById("set-height"),   
    vid = document.getElementById('v0'); 

// dynamically set the page height according to video length
vid.addEventListener('loadedmetadata', function() {
    console.log('vid length: ' + vid.duration);
    setHeight.style.height = Math.floor(vid.duration) * playbackConst + "px";
});


// Use requestAnimationFrame for smooth playback
function scollPlay(){  
    var frameNumber = window.pageYOffset/playbackConst;
    //console.log(frameNumber);

    if (vid.currentTime != frameNumber) {
        vid.currentTime = frameNumber;
        console.log(vid.currentTime);
    }

    window.requestAnimationFrame(scollPlay);
}

window.requestAnimationFrame(scollPlay);