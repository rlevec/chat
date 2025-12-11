import { db } from "../../../index.js";

export const hset = async (params) => {
    const { key, field, value } = params;
    try {
      const result = await db?.redis?.client?.hSet(key, field, value);
      return typeof result === "number" && result >= 1;
    } catch (err) {
      console.error("Redis hset error:", err);
      return false;
    }
  };
  