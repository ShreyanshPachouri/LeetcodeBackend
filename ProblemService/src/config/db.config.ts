import mongoose from 'mongoose';
import logger from './logger.config'
import { serverConfig } from '.';

export const connectDB = async() => {
    try{
        const dbUrl = serverConfig.DB_URL;
        await mongoose.connect(dbUrl);

        logger.info(`Connected to the database successfully`);

        mongoose.connection.on('error', (error) => {
            logger.error(`Database connection error: ${error}`);
        })

        mongoose.connection.on('disconnected', () => {
            logger.warn(`Database connection disconnected`);
        })
    }

    catch(error){
        logger.error(`Error connecting to the database: ${error}`);
        process.exit(1);
    }
}