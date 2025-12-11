
import { utils } from "../../utils/index.js";
import { db } from "../../db/index.js";

export const verifyToken = async (params = {}) => {
  const { client, type, activation_code, reset_code, token } = params;

  if (!client) return utils.throw_new_error(500, "Database client is required.");
  if (!token) return utils.throw_new_error(400, "Token is required.");
  if (!["account", "password"].includes(type)) {
    return utils.throw_new_error(400, "Invalid type.");
  }

  const user = await db?.psql?.queries?.user?.select_user_by_token({ token, type, client });
  if (!user) {
    return utils.throw_new_error(
      400,
      `${type === "account" ? "Account activation" : "Password reset"} token is invalid or has expired!`
    );
  }

  if (type === "account" && user.activated) {
    return utils.throw_new_error(400, "You have already activated your account!");
  }

  const providedCode = type === "account" ? activation_code : reset_code;
  const codeField = type === "account" ? "activation_code" : "reset_code";

  if (providedCode && providedCode.trim() !== user[codeField]) {
    return utils.throw_new_error(
      400,
      `Invalid ${type === "account" ? "activation" : "reset"} code.`
    );
  }

  const updated = await db.psql.queries.user.update_user_after_verification({
    id: user.id,
    type,
    client,
  });

  if (updated !== 1) {
    return utils.throw_new_error(
      500,
      `An error occurred during ${type === "account" ? "account activation" : "password reset"}!`
    );
  }

  return user;
};
