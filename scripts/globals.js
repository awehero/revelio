// revelio/scripts/globals.js

// GLOBAL STATE
let player = null;          // YouTube player instance
let gameRegion = null;      // { x, y, width, height }
let canvas = null;          // main canvas
let ctx = null;             // canvas context

// CONSTANTS
const SAMPLE_INTERVAL = 100;   // ms
const REGION_THRESHOLD = 15;   // brightness threshold for black bars

let session = null;

async function loadModel() {
    session = await ort.InferenceSession.create("models/game_region.onnx");
    console.log("ONNX model loaded");
}
