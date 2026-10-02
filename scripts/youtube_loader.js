// revelio/scripts/youtube_loader.js

let player;

// Extract YouTube ID from link
function extractID(url) {
    // Standard watch URL
    if (url.includes("v=")) {
        return url.split("v=")[1].split("&")[0];
    }

    // Shortened URL
    if (url.includes("youtu.be/")) {
        return url.split("youtu.be/")[1].split("?")[0];
    }

    // Live URL
    if (url.includes("youtube.com/live/")) {
        return url.split("youtube.com/live/")[1].split("?")[0];
    }

    // Shorts URL
    if (url.includes("youtube.com/shorts/")) {
        return url.split("youtube.com/shorts/")[1].split("?")[0];
    }

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
