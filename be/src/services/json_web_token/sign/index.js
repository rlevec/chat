import jwt from "jsonwebtoken"

import {db} from "../../../db/index.js"

import { config } from "../../../config/index.js"

import {json_web_token} from "../index.js"

export const sign = async ({ payload, type, redisKey }) => {
  json_web_token?.validate({payload});
  
    const token = jwt.sign(payload, config.jwt_secret, {
      expiresIn: json_web_token?.expiration?.[type],
    });
  
    if (type === "refresh" && redisKey) {
      await db?.redis?.utils?.set({
        key: redisKey,
        value: token,
        expiresIn: json_web_token?.expiration?.refresh,
      });
    }
  
    return token;
  }