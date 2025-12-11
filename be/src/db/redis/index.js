import { redisClient } from "./client/index.js"
import { redisSubscriber } from "./client/index.js"
import { redistInit } from "./init/index.js"
import { utils } from "./utils/index.js"

export const redis = {
    client: redisClient,
    subscriber: redisSubscriber,
    init: redistInit,
    utils
}