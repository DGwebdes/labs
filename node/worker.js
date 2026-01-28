const { workerData, parentPort } = require("worker_threads");

function fibonacci(n) {
    return n < 1 ? 1 : fibonacci(n - 1) + fibonacci(n - 2);
}

parentPort.postMessage(fibonacci(workerData));
