// revelio/scripts/region_detector.js

async function detectInitialRegion() {
    console.log("Detecting game region...");

    const frame = grabFrame();
    if (!frame) {
        console.warn("Could not grab frame.");
        return;
    }

    // TODO: Replace this with AI segmentation
    // For now, we just assume full frame
    gameRegion = {
        x: 0,
        y: 0,
        width: frame.width,
        height: frame.height
    };

    console.log("Game region set:", gameRegion);
}
