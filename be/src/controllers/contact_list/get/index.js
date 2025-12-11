import { db } from "../../../db/index.js";

import {services} from "../../../services/index.js"

export const get = async(req, res, next) => {
    const client = await db.psql.pool.connect();

    try {
        await client.query("BEGIN");

        const response = await services.contact_list({req, client})

        await client.query("COMMIT");

        res.status(200).json(response);
    }catch(error) {
        console.error("Error handling contact list GET request:", error);
        await client.query("ROLLBACK");
        next(error);
    } finally {
        client.release();
      }
}