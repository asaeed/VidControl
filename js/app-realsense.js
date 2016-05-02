
/*

  .ogv format seems to perform the best when rapidly setting currentTime
  to convert to high quality ogv, use:

  brew install --with-theora --with-libvorbis ffmpeg
  ffmpeg -i test.mov -c:v libtheora -c:a libvorbis -q:v 10 -q:a 10 test.ogv

*/

var ww, wh, mx, my;
var vid = document.getElementById('v0');

window.onload = setup;

function setup() {
    ww = window.innerWidth;
    wh = window.innerHeight;

    setupWebSocket();
    vid.addEventListener('loadedmetadata', onVideoLoad, false);
    window.requestAnimationFrame(update);
}

function setupWebSocket() {
    ws = new WebSocket("ws://localhost:8181/");

    ws.onopen = function() {
      ws.send("Message to send");
      console.log("Message is sent...");
    };

    ws.onmessage = function(e) {
      var data = JSON.parse(e.data);
      mx = (data.X + (data.W/2))/640 * ww;
    };

    ws.onclose = function() {
      console.log("Connection is closed...");
    };
}

function update() {
    var newTime = 0;
    if (mx > 1) newTime = mx/ww * vid.duration;

    if (vid.currentTime != Math.floor(newTime*1000000)/1000000) {
        vid.currentTime = newTime;
        console.log(vid.currentTime + ' - ' + newTime);
    }

    window.requestAnimationFrame(update);
}

function onVideoLoad() {
    console.log('vid length: ' + vid.duration);
}

// function onMouseMove(e) {
//     mx = e.clientX;
//     my = e.clientY;
// }
