// revelio/scripts/region_detector.js

function rowBrightness(frame, y) {
    let sum = 0;
    for (let x = 0; x < frame.width; x++) {
        const i = (y * frame.width + x) * 4;
        sum += frame.data[i] + frame.data[i+1] + frame.data[i+2];
    }
    return sum / frame.width;
}

function colBrightness(frame, x) {
    let sum = 0;
    for (let y = 0; y < frame.height; y++) {
        const i = (y * frame.width + x) * 4;
        sum += frame.data[i] + frame.data[i+1] + frame.data[i+2];
    }
    return sum / frame.height;
}

function findVerticalBounds(frame) {
    let top = 0;
    let bottom = frame.height - 1;

    for (let y = 0; y < frame.height; y++) {
        if (rowBrightness(frame, y) > REGION_THRESHOLD) {
            top = y;
            break;
        }
    }

    for (let y = frame.height - 1; y >= 0; y--) {
        if (rowBrightness(frame, y) > REGION_THRESHOLD) {
            bottom = y;
            break;
        }
    }

    return { top, bottom };
}

function findHorizontalBounds(frame) {
    let left = 0;
    let right = frame.width - 1;

    for (let x = 0; x < frame.width; x++) {
        if (colBrightness(frame, x) > REGION_THRESHOLD) {
            left = x;
            break;
        }
    }

    for (let x = frame.width - 1; x >= 0; x--) {
        if (colBrightness(frame, x) > REGION_THRESHOLD) {
            right = x;
            break;
        }
    }

    return { left, right };
}

function detectGameRegion(frame) {
    const { top, bottom } = findVerticalBounds(frame);
    const { left, right } = findHorizontalBounds(frame);

    gameRegion = {
        x: left,
        y: top,
        width: right - left,
        height: bottom - top
    };

    console.log("Game region detected:", gameRegion);
}
