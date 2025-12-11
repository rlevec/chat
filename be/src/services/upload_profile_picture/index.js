import { utils } from "../../utils/index.js";
import { db } from "../../db/index.js";

export const uploadProfilePicture = async (params = {}) => {
  const { req = {}, fileBuffer, io, client } = params;
  const user = req.user;

  if (!user) {
    utils?.throw_new_error(400, "Invalid user");
  }

  if (!fileBuffer || !Buffer.isBuffer(fileBuffer)) {
    utils?.throw_new_error(400, "Invalid file data");
  }

  try {
    const updated = await db.psql.queries.user.update_user_profile_picture({
      id: user?.id,
      buffer: fileBuffer,
      client
    });

    if (updated === 0) {
      throw utils.throw_new_error(
        404,
        "User not found or profile picture not updated"
      );
    }

    return {
      success: true,
      message: "You have successfully uploaded your profile picture!",
      status: 200,
    };
  } catch (err) {
    throw err;
  }
};