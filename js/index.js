const canvas = document.getElementById("root");
const context = canvas.getContext("2d");

// setting up audio context
const stream = document.getElementById("audio");
const audioContext = new AudioContext();
const analyser = audioContext.createAnalyser();
const source = audioContext.createMediaElementSource(stream);
source.connect(analyser);
source.connect(audioContext.destination);

analyser.fftSize = 2048;
const bufferLength = analyser.frequencyBinCount;
const dataArray = new Uint8Array(bufferLength);

const dpr = window.devicePixelRatio || 1;
// canvas.width = window.innerWidth * dpr;
// canvas.height = window.innerHeight * dpr;
const WIDTH = 1280 * dpr;
const HEIGHT = 720 * dpr;

context.clearRect(0, 0, WIDTH, HEIGHT);
function draw() {
    const drawVisual = requestAnimationFrame(draw);
    analyser.getByteFrequencyData(dataArray);

    context.fillRect(0, 0, WIDTH, HEIGHT);
    context.strokeStyle = "red";
    context.lineWidth = 2;
    context.beginPath();

    /**
     * TODO improve visualization waves
     */
    const sliceWidth = WIDTH / bufferLength;
    let x = 0;
    for (let i = 0; i < bufferLength; i++) {
        const v = dataArray[i] / 256.0;
        const y = v * (HEIGHT / 2);

        if (i === 0) {
            context.moveTo(x, y);
        } else {
            context.lineTo(x, y);
        }
        x += sliceWidth;
    }
    context.lineTo(WIDTH, HEIGHT / 2);
    context.stroke();
}
draw();

const playButton = document.querySelector("button");
playButton.addEventListener("click", () => {
    // Check if context is in suspended state (autoplay policy)
    if (audioContext.state === "suspended") {
        audioContext.resume();
    }

    if (playButton.dataset.playing === "false") {
        stream.play();
        playButton.dataset.playing = "true";
    } else if (playButton.dataset.playing === "true") {
        stream.pause();
        playButton.dataset.playing = "false";
    }
});
stream.addEventListener("ended", () => {
    playButton.dataset.playing = "false";
});
