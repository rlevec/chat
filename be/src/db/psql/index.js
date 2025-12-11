import { init } from "./init/index.js";
import { pool } from "./pool/index.js";
import { queries } from "./queries/index.js";

export const psql = {
    init,
    pool,
    queries
}