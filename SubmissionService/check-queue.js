const Redis = require("ioredis");
const redis = new Redis({ host: "localhost", port: 6379, maxRetriesPerRequest: null });

(async () => {
    const completed = await redis.zrange("bull:submission:completed", 0, -1);
    console.log("Completed job IDs:", completed);

    const jobData = await redis.hgetall("bull:submission:1");
    console.log("Job 1 data:", jobData);

    process.exit(0);
})();