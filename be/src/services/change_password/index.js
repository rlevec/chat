import { services } from "../index.js";
import { utils } from "../../utils/index.js";
import { db } from "../../db/index.js";

export const changePassword = async (params = {}) => {
  const { req = {}, client = undefined } = params;

  const user = req.user;
  const userId = user?.id;
  
  const { password = undefined, new_password: newPassword = undefined } = req.body;

  if (!password || !newPassword) {
    return utils.throw_new_error(400, "Both current and new passwords are required.");
  }

  if (password === newPassword) {
    return utils.throw_new_error(400, "New password cannot be the same as the current password.");
  }

  const userById = await db.psql?.queries?.user?.select_user_by_id({
    id: userId,
    client,
  });

  if (!userById) return utils?.throw_new_error(401, "Invalid credentials");

  const hashedPassword = userById?.password;

  const verifiedPassword = await services?.verify_password({
    password,
    hashedPassword,
  });

  if (!verifiedPassword) {
    return utils?.throw_new_error(401, "Invalid credentials");
  }

  const hashedNewPassword = await services?.hash_password({password: newPassword});

  const updated = await db.psql.queries.user.update_user_password_by_id({
    id: userId,
    password: hashedNewPassword,
    client,
  });

  if (updated === 0) {
    throw utils.throw_new_error(404, "User not found or password not updated");
  }

  return {
    success: true,
    message: "You have successfully changed your password!",
    status: 200,
  };
};
