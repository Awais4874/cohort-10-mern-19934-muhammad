import mongoose from "mongoose";
import { env } from "./env.js";
import { logger } from "../utils/logger.js";

export const connectDatabase = async (): Promise<void> => {
  await mongoose.connect(env.mongoUri);
  logger.info("MongoDB connection established");
};

export const disconnectDatabase = async (): Promise<void> => {
  if (mongoose.connection.readyState !== 0) {
    await mongoose.disconnect();
    logger.info("MongoDB connection closed");
  }
};