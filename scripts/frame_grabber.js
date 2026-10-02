// revelio/scripts/frame_grabber.js

canvas = document.getElementById("frameCanvas");
ctx = canvas.getContext("2d");

function grabFrame() {
    try {
        ctx.drawImage(document.querySelector("iframe"), 0, 0, canvas.width, canvas.height);
        return ctx.getImageData(0, 0, canvas.width, canvas.height);
    } catch (e) {
        return null;
    }
}
