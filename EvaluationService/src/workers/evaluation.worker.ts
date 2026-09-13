import logger from "../config/logger.config";
import { createNewRedisConnection } from "../config/redis.config";
import { SUBMISSION_QUEUE } from "../utils/constants";
import { Worker } from "bullmq";

async function setupEvaluationWorker(){
    const worker = new Worker(SUBMISSION_QUEUE, async(job) => {
        logger.info(`Processing job ${job.id}`)
    }, {
        connection: createNewRedisConnection()
    })

    worker.on("error", (error) => {
        logger.error(`Evaluation worker error: ${error}`)
    })

    worker.on("completed", (job) => {
        logger.info(`Evaluation job completed: ${job.id}`)
    })

   worker.on("failed", (job, error) => {
    logger.error(`Evaluation job failed: ${job?.id}, reason: ${error.message}`)
})
}

export async function startworkers(){
    await setupEvaluationWorker()
}