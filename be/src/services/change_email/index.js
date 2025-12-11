import { services } from "../index.js";
import { utils } from "../../utils/index.js";
import { db } from "../../db/index.js";

export const changeEmail = async (params = {}) => {
  const { req = {}, client = undefined } = params;

  const user = req.user;
  const userId = user?.id;

  const { email = undefined, password = undefined } = req.body;

  if (!email) {
    return utils.throw_new_error(400, "Email is missing.");
  }

  const userById = await db.psql?.queries?.user?.select_user_by_id({
    id: userId,
    client,
  });

  if (!userById) return utils?.throw_new_error(401, "Invalid credentials");

  if (email === userById?.email) {
    return utils.throw_new_error(400, "That's already your current email.");
  }

  const userByEmail = await db.psql?.queries?.user?.select_user_by_email({email, client})

  if (userByEmail && String(userByEmail.id) !== userId) {
    return utils.throw_new_error(400, "User with that email already exists.");
  }
  const hashedPassword = userById?.password;

  const verifiedPassword = await services?.verify_password({
    password,
    hashedPassword,
  });

  if (!verifiedPassword)
    return utils?.throw_new_error(401, "Invalid credentials");

  const updated = await db.psql.queries.user.update_user_email({
    id: userId,
    email,
    client,
  });

  if (updated === 0) {
    throw utils.throw_new_error(404, "User not found or email not updated");
  }


  return {
    success: true,
    message: "You have successfully changed your email!",
    status: 200,
  };
};
