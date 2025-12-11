import { services } from "../../../services/index.js";
import { db } from "../../../db/index.js";

export const get = async (req, res, next) => {
    const client = await db.psql.pool.connect();

    try {
        await client.query("BEGIN");

        const imageBuffer = await services.profile_picture({ req, client });

        await client.query("COMMIT");
        
        res.setHeader("Content-Type", "image/jpeg");
        res.setHeader("Content-Length", imageBuffer.length);
        res.setHeader("Cache-Control", "public, max-age=3600");
        res.setHeader("Last-Modified", new Date().toUTCString());
        
        res.send(imageBuffer);

    } catch (error) {
        console.error("Error handling profile picture GET request:", error);
        await client.query("ROLLBACK");
        next(error);
    } finally {
        client.release();
    }
}