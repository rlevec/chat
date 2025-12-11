import crypto from "crypto";
import { utils } from "../../utils/index.js";
import { db } from "../../db/index.js";

export const setToken = async (params = {}) => {
  const { type = "", email = "", client } = params;

  if (!client) return utils.throw_new_error(500, "Database client is required.");
  if (!email) return utils.throw_new_error(400, "Email is required.");
  if (!["account", "password"].includes(type)) {
    return utils.throw_new_error(400, "Invalid type.");
  }

  const token = crypto.randomBytes(20).toString("hex");
  const expires = new Date(Date.now() + 3600000);

  const user = await db.psql.queries.user.select_user_by_email({ email, client });
  if (!user) return utils.throw_new_error(404, "User not found.");

  let updated = 0;
  if (type === "account") {
    updated = await db.psql.queries.user.update_user_activation_token({
      id: user.id,
      token,
      expires,
      client,
    });
  } else if (type === "password") {
    updated = await db.psql.queries.user.update_user_password_token({
      id: user.id,
      token,
      expires,
      client,
    });
  }

  if (updated !== 1) {
    const errorMsg = {
      account: "Error setting activation token.",
      password: "Error setting reset password token.",
    };
    return utils.throw_new_error(500, errorMsg[type]);
  }

  return token;
};
