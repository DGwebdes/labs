// use this in a callback function from a /health route

const health = {
    status: "healthy",
    timestamp: new Date().toISOString(),
    memory: process.memoryUsage(),
    queue: {
        pending: queue.queue.length,
        running: queue.running,
    },
    metrics: performanceMonitor.getMetrics(),
};

if (queue.queue.length > 1000 || health.memory.heapUsed > 1.5e9) {
    ((health.status = "degraded"), res.status(503));
}
