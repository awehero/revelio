// revelio/scripts/main.js
loadModel();

setInterval(() => {
    if (!player || !gameRegion) return;

    const frame = grabFrame();
    if (!frame) return;

    // Crop to game region
    const { x, y, width, height } = gameRegion;

    const cropped = ctx.getImageData(x, y, width, height);

    // TODO: load detection goes here
}, SAMPLE_INTERVAL);
