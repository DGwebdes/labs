const cluster = require("node:cluster");
const http = require("node:http");
const os = require("node:os");
const process = require("node:process");

const numCPUs = os.availableParallelism();
console.log("CPUs:", numCPUs);

if (cluster.isPrimary) {
    console.log(`Primary process with ID ${process.pid} is running`);

    for (let i = 0; i < numCPUs; i++) {
        cluster.fork();
    }

    cluster.on("exit", (worker, code, signal) => {
        console.log(`worker process with ID ${worker.process.pid} exited`);
    });
} else {
    http.createServer((req, res) => {
        res.writeHead(200);
        res.end("Hello world\n");
    }).listen(3000);

    console.log(`Worker process with ID ${process.pid} started`);
}
