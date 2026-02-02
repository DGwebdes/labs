const fs = require("fs");
const readline = require("readline");

async function processLargeFile(filePath, processingFunction) {
    const fileStream = fs.createReadStream(filePath);
    const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity,
    });

    const batchSize = 1000;
    let batch = [];
    let processedCount = 0;

    for await (const line of rl) {
        batch.push(line);

        if (batch.length === batchSize) {
            await processingFunction(batch);
            processedCount += batch.length;
            batch = []; // clear batch to free memory

            console.log(`Processed ${processedCount} records`);
        }
    }

    if (batch > 0) {
        await processingFunction(batch);
        processedCount += batch.length;
    }

    console.log(`Total processed: ${processedCount} records`);
}
