import { psql } from "./psql/index.js"
import {redis} from "./redis/index.js"

export const db = {
    psql,
    redis
}