import { db } from "../../../db/index.js";

import {services} from "../../../services/index.js"

export const post = async(req, res, next, io) => {
    const client = await db.psql.pool.connect();

    try {

        await client.query("BEGIN");

        const response = await services.change_password({req, client})

        await client.query("COMMIT");

        res.status(200).json(response);
    }catch(error) {
        console.error("Error handling change password POST request:", error);
        await client.query("ROLLBACK");
        next(error);
    } finally {
        client.release();
      }
}