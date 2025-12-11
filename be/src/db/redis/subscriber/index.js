
import { db } from "../../index.js";

export const redisSubscriber = db?.redis?.client?.duplicate(); 