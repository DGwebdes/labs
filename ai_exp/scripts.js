const video = document.getElementById("video");
const constraint = {
    audio: false,
    video: true,
};

navigator.mediaDevices
    .getUserMedia(constraint)
    .then((stream) => {
        const videoTracks = stream.getVideoTracks();
        console.log(videoTracks);
        console.log("Got stream");
        console.log(`Using device: ${videoTracks[0].label}`);
        stream.onremovetrack = () => {
            console.log("Stream ended");
        };
        video.srcObject = stream;
        video.addEventListener("loadedmetadata", () => {
            video.play();
        });
    })
    .catch((error) => {
        if (error.name === "OverconstrainedError") {
            console.error(
                `Error Resolution: ${constraint.video.width.exact}x${constraint.video.height.exact} is not supported on your device.`,
            );
        } else if (error.name === "NotAllowedError") {
            console.error("No permission granted");
        } else {
            console.error(`getUserMedia error: ${error.name}`, error);
        }
    });
