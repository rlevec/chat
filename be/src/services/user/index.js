import { utils } from "../../utils/index.js";
import { db } from "../../db/index.js";

export const user = async (params = {}) => {
  const { req = {}, client } = params;

  const currentUser = req.user;
  const userId = currentUser?.id;


  if (!userId) {
    return utils.throw_new_error(401, "Unauthorized: User not found!");
  }


  const user = await db.psql.queries.user.select_user_by_id({
    client,
    id: parseInt(userId),
  });

  if(!user) {
    return utils.throw_new_error(404, "User not found in DB!");
  }

  const contactList = await db.psql.queries.contact?.select_contacts_by_user_id({
    client,
    userId,
  });


  return {
    success: true,
    message: "User fetched successfully",
    status: 200,
    data: {
      username: user?.username,
      id: user?.id,
      contacts: contactList?.length ?? 0
    }
  }
}