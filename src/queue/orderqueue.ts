import { Queue } from "bullmq";
import redis  from "../config/redix";

export const orderQueue = new Queue("orders", { connection: redis });
