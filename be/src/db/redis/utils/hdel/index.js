import { db } from "../../../index.js";

export const hdel = async (params) => {
    const { key, fields } = params;
    try {
      const fieldsArray = Array.isArray(fields) ? fields : [fields];
      const deletedCount = await db?.redis?.client?.hDel(key, fieldsArray);
      return deletedCount;
    } catch (err) {
      console.error("Redis hdel error:", err);
      return 0;
    }
  };