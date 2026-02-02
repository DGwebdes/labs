// Inefficient
async function processIndividually(requests) {
    const results = [];
    for (const request of requests) {
        const r = await processRequest(request);
        results.push(r);
    }
    return results;
}

// Optimized. Process in batches
async function processBatch(requests, batchSize = 50) {
    const results = [];

    for (let i = 0; i < requests.length; i += batchSize) {
        const batch = requests.slice(i, i + batchSize);

        //Batch process concurrently with limit
        const batchResult = await Promise.allSettled(
            batch.map((request) => {
                processRequest(request);
            }),
        );

        results.push(...batchResult);

        // await new Promise((resolve) => setTimeout(resolve, 100));
    }
    return results;
}
