import logger from "../config/logger.config";
import { createNewRedisConnection } from "../config/redis.config";
import { SUBMISSION_QUEUE } from "../utils/constants";
import { Worker } from "bullmq";

async function setupEvaluationWorker(){
    const worker = new Worker(SUBMISSION_QUEUE, async(job) => {
        logger.info(`Processing job ${job}`)
    }, {
        connection: createNewRedisConnection()
    })

    worker.on("error", (error) => {
        logger.error(`Evaluation worker error: ${error}`)
    })

    worker.on("completed", (job) => {
        logger.error(`Evaluation job completed: ${job}`)
    })

    worker.on("failed", (job, error) => {
        logger.error(`Evaluation job failed: ${job}`, error)
    })
}

export async function startworkers(){
    await setupEvaluationWorker()
}