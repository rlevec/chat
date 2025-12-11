import { db } from "../../../index.js";

export const set = async (params) => {
  const { key, value, expiresIn } = params || {};
  try {
    let result;
    if (expiresIn) {
      result = await db?.redis?.client?.set(key, value, { EX: expiresIn });
    } else {
      result = await db?.redis?.client?.set(key, value);
    }

    return result === 'OK';
  } catch (err) {
    console.error('Redis set error:', err);
    return false;
  }
};