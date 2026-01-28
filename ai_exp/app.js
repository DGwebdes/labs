// Find more about here: https://ai.google.dev/edge/mediapipe/solutions/guide

const vision = FilesetResolver.forVisionTasks(
    "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm",
);

const handLandMarker = handLandMarker.createFromOptions(vision, {
    baseOptions: {
        modelAssetPath: "/shared/models/hand_landmarker.task",
    },
    numHands: 2,
    runningMode: "video",
});

let lastVideoTime = -1;
function renderLoop() {
    const video = document.getElementById("video");
    if (video.currentTime !== video.lastVideoTime) {
        const detections = handLandMarker.detectForVideo(video);
        processResults(detections);
        lastVideoTime = video.currentTime;
    }

    requestAnimationFrame(() => {
        renderLoop();
    });
}
