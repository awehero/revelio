// revelio/scripts/main.js

setInterval(() => {
    if (!player) return;

    const frame = grabFrame();
    if (!frame) return;

    // Detect region once
    if (!gameRegion) {
        detectGameRegion(frame);
        return;
    }

    // Later: crop frame, detect loads, update timer
}, SAMPLE_INTERVAL);
