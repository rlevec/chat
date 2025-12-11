import { db } from "../../../index.js";

export const hgetall = async (params) => {
    const { key } = params;
    try {
      const data = await db?.redis?.client?.hGetAll(key);
  
      if (
        data &&
        typeof data === "object" &&
        !Array.isArray(data) &&
        Object.values(data).every((val) => typeof val === "string")
      ) {
        return data;
      }

      return null;
    } catch (err) {
      console.error("Redis hgetall error:", err);
      return null;
    }
  };