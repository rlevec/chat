import { db } from "../../../index.js";

export const hget = async (params) => {
    const { key, field } = params;
    try {
      const value = await db?.redis?.client?.hGet(key, field);
  
      if (value === null || value === undefined) {
        return null;
      }
  
      if (
        typeof value === "string" ||
        typeof value === "number" ||
        typeof value === "bigint" ||
        typeof value === "boolean"
      ) {
        return String(value);
      }
      return null;
    } catch (err) {
      console.error("Redis hget error:", err);
      return null;
    }
  };
  