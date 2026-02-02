const pool = new Pool({
    host: "database",
    user: "username",
    password: "pass123",
    database: "postgres",
    // optimize pool settings for high frequency
    max: 20,
    min: 5,
    acquireTimeoutMil: 30000,
    idleTimeoutMil: 600000,
});

async function batchDatabaseOperations(operations) {
    const client = await pool.connect();

    try {
        await client.query("BEGIN");

        const result = await Promise.all(
            operations.map((op) => client.query(op.query, op.params)),
        );

        await client.query("COMMIT");
        return result;
    } catch (error) {
        await client.query("ROLLBACK");
        throw error;
    } finally {
        client.release();
    }
}
