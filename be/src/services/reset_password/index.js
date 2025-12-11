import { services } from "../../services/index.js";
import { utils } from "../../utils/index.js";
import { db } from "../../db/index.js";

export const resetPassword = async (params = {}) => {
  const { req = {}, client = undefined } = params;

  const {
    token = undefined,
    password = undefined,
    reset_code = undefined,
  } = req.body;

  if (!token) {
    return utils.throw_new_error(400, "Missing required token parameter.");
  }

  if (!reset_code) {
    return utils.throw_new_error(400, "Missing reset code.");
  }

  try {

    const verifyTokenResponse = await services.verify_token({
      client,
      type: "password",
      reset_code,
      token,
    });

    if (!Boolean(verifyTokenResponse)) {
      throw utils.throw_new_error(
        400,
        "Password reset token verification error!"
      );
    }

    const userId = verifyTokenResponse?.id;

    const hashedPassword = await services?.hash_password({ password });

    if (!hashedPassword) {
      throw utils.throw_new_error(500, "Failed to hash password");
    }

    const updated = await db.psql.queries.user.update_user_password_by_id({
      id: userId,
      password: hashedPassword,
      client,
    });
    
    if (updated === 0) {
      throw utils.throw_new_error(404, "User not found or password not updated");
    }

    return {
      success: true,
      message: "You have successfully reset your password!",
      status: 200,
    };
  } catch (error) {
    throw error;
  }
};
