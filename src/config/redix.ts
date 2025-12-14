import IORedis from "ioredis";
import dotenv from "dotenv";

dotenv.config();

if (!process.env.REDIS_URL) {
  throw new Error("REDIS_URL is not set in environment variables");
}

export const redis = new IORedis(process.env.REDIS_URL, {
  maxRetriesPerRequest: null,
  enableOfflineQueue: true,
});

export default redis;