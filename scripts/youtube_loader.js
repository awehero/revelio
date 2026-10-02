// revelio/scripts/youtube_loader.js

let player;

// Extract YouTube ID from link
function extractID(url) {
    if (url.includes("v=")) return url.split("v=")[1].split("&")[0];
    if (url.includes("youtu.be/")) return url.split("youtu.be/")[1].split("?")[0];
    return null;
}

// YouTube API callback
function onYouTubeIframeAPIReady() {
    // Player created later when user clicks Load
}

// Create the YouTube player
function createPlayer(videoId) {
    player = new YT.Player("player", {
        videoId: videoId,
        events: {
            onReady: () => {
                console.log("Player ready");
            }
        }
    });
}

// Load button
document.getElementById("loadBtn").onclick = () => {
    const link = document.getElementById("ytLink").value;
    const id = extractID(link);

    if (!id) {
        alert("Invalid YouTube link");
        return;
    }

    createPlayer(id);
};
