
import {db} from "../../../db/index.js"

export const deleteToken = async ({ redisKey }) => {
    return await db?.redis?.utils?.del?.({redisKey})
  }