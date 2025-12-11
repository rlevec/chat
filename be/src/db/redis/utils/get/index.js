import { db } from "../../../index.js";

export const get = async (params) => {
  const { key } = params || {};
  try {
    const value = await db?.redis?.client?.get(key);
    return value;
  } catch (err) {
    console.error('Redis get error:', err);
    return null;
  }
};