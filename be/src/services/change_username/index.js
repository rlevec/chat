import { services } from "../index.js";
import { utils } from "../../utils/index.js";
import { db } from "../../db/index.js";
import { socket_io } from "../../socket_io/index.js";

export const changeUsername = async (params = {}) => {
  const { req = {}, client = undefined, io } = params;

  const user = req.user;

  const userId = user?.id;

  const { username = undefined, password = undefined } = req.body;

  if (!username) {
    return utils.throw_new_error(400, "Username is missing.");
  }

  const userById = await db.psql?.queries?.user?.select_user_by_id({
    id: userId,
    client,
  });

  if (!userById) return utils?.throw_new_error(401, "Invalid credentials");

  if (username === userById?.username) {
    return utils.throw_new_error(400, "That's already your current username.");
  }

  const userByUsername = await db.psql?.queries?.user?.select_user_by_username({username, client})

  if (userByUsername && String(userByUsername.id) !== userId) {
    return utils.throw_new_error(400, "User with that username already exists.");
  }

  const hashedPassword = userById?.password;

  const verifiedPassword = await services?.verify_password({
    password,
    hashedPassword,
  });

  if (!verifiedPassword)
    return utils?.throw_new_error(401, "Invalid credentials");

  const updated = await db.psql.queries.user.update_user_username({
    id: userId,
    username,
    client,
  });

  if (updated === 0) {
    throw utils.throw_new_error(404, "User not found or username not updated");
  }

  const contactList = await db.psql.queries.contact?.select_contacts_by_user_id(
    {
      userId,
      client,
    }
  );

  const ids = contactList?.map((contactListEntry) =>
    String(contactListEntry?.contact_id)
  );

  const data = {
    contact: {
      userId: userById?.id,
      username: username,
    },
    newUsername: username,
    oldUsername: userById?.username,
  };

  if (ids?.length > 0) {
    await socket_io?.events?.change_username({
      io,
      userIds: ids,
      data,
    });
  }

  return {
    success: true,
    message: "You have successfully changed your username!",
    status: 200,
  };
};
