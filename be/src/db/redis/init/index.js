import { db } from "../../index.js";

export const redistInit = async () => {
    try {
      if (!db?.redis?.client?.isOpen) {
        await db?.redis?.client?.connect();
      }
      if (!db?.redis?.subscriber?.isOpen) {
        await db?.redis?.subscriber?.connect();
      }
  
      const pingResponse = await db?.redis?.client?.ping();
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