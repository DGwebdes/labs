const { Worker } = require("worker_threads");

const run = () => {
    return new Promise((resolve, reject) => {
        const worker = new Worker("./worker.js", { workerData: 40 });
        worker.on("message", resolve);
        worker.on("error", reject);
        worker.on("exit", (code) => {
            if (code !== 0) {
                reject(new Error(`Worker stopped with exit code: ${code}`));
            }
        });
    });
};
run().then(console.log);
