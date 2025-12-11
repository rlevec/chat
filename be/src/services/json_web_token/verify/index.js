import jwt from "jsonwebtoken"

import { db } from "../../../db/index.js";

import { config } from "../../../config/index.js";

export const verify = async ({ token, type, redisKey }) => {
    try {
      const decoded = jwt.verify(token, config.jwt_secret);
  
      if (type === "refresh" && redisKey) {
        const redisToken = await db?.redis?.utils?.get({ key: redisKey });
        if (redisToken !== token) {
          return null;
        }
      }
  
      return decoded;
    } catch (err) {
      console.error("Token verification error:", err);
      return null;
    }
  };
  