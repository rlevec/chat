import { db } from "../../db/index.js";
import { utils } from "../../utils/index.js";

export const profilePicture = async ({ req, client }) => {
    const id = req.params.id || req.user?.id || 1;


    const userProfileImage = await db.psql.queries.user.select_profile_picture_by_id({
        client,
        id: parseInt(id),
    });

    const imageBuffer = userProfileImage?.profile_picture;

    if (!imageBuffer || !Buffer.isBuffer(imageBuffer) || imageBuffer.length === 0) {
        utils?.throw_new_error(404, "Profile picture not found");
    }

    return imageBuffer;
}