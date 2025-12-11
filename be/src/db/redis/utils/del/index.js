import { db } from "../../../index.js";

export const del = async (params)=> {
  const { key } = params || {};
  try {
    const result = await db?.redis?.client?.del(key);
    return result === 1;
  } catch (err) {
    console.error('Redis del error:', err);
    return false;
  }
};