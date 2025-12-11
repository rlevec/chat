import { createClient } from "redis";

import { config } from "../../../config/index.js";

export const redisClient = createClient({
  url: config?.redis_port,
});

export const redisSubscriber = redisClient.duplicate();

export const initializeRedisClient = async () => {
    try {
      if (!redisClient.isOpen) {
        await redisClient.connect();
      }
      if (!redisSubscriber.isOpen) {
        await redisSubscriber.connect();
      }
  
      const pingResponse = await redisClient.ping();
      if (pingResponse === "PONG") {
        console.log("Redis connected successfully");
        return;
      }
  
      console.log(`Unexpected response from Redis PING: ${pingResponse}`);
    } catch (err) {
      const error = err instanceof Error ? err.message : "Unknown error";
      console.log(`Redis connection failed: ${error}`);
    }
  };

  export const client = {
    client:redisClient,
    subscriber: redisSubscriber,
    init: initializeRedisClient
  }