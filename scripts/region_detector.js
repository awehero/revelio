// revelio/scripts/region_detector.js

async function detectInitialRegion() {
    // Draw the first frame into the canvas
    const frame = grabFrame();
    if (!frame) {
        console.log("No frame available yet");
        return;
    }

    // Put frame into canvas (frame_grabber gives ImageData, not drawn)
    ctx.putImageData(frame, 0, 0);

    // Run ONNX region detection
    const box = await detectGameRegion(canvas);
    if (!box) {
        console.log("Region detection failed");
        return;
    }

    // Save globally
    gameRegion = {
        x: box.minX,
        y: box.minY,
        width: box.maxX - box.minX,
        height: box.maxY - box.minY
    };

    console.log("Detected game region:", gameRegion);
}

function canvasToTensor(canvas) {
    const ctx = canvas.getContext("2d");
    const img = ctx.getImageData(0, 0, canvas.width, canvas.height);

    const data = new Float32Array(canvas.width * canvas.height * 3);

    for (let i = 0; i < canvas.width * canvas.height; i++) {
        data[i * 3 + 0] = img.data[i * 4 + 0] / 255;
        data[i * 3 + 1] = img.data[i * 4 + 1] / 255;
        data[i * 3 + 2] = img.data[i * 4 + 2] / 255;
    }

    return new ort.Tensor("float32", data, [1, 3, canvas.height, canvas.width]);
}

async function detectRegionONNX(canvas) {
    if (!session) return null;

    const input = canvasToTensor(canvas);
    const output = await session.run({ input });

    return output.output.data; // Float32Array
}

function maskToBox(mask, w, h) {
    let minX = w, minY = h, maxX = 0, maxY = 0;

    for (let y = 0; y < h; y++) {
        for (let x = 0; x < w; x++) {
            const v = mask[y * w + x];
            if (v > 0.5) {
                if (x < minX) minX = x;
                if (y < minY) minY = y;
                if (x > maxX) maxX = x;
                if (y > maxY) maxY = y;
            }
        }
    }

    return { minX, minY, maxX, maxY };
}

async function detectGameRegion(canvas) {
    const mask = await detectRegionONNX(canvas);
    if (!mask) return null;

    return maskToBox(mask, canvas.width, canvas.height);
}
