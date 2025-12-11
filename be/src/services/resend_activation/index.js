import { utils } from "../../utils/index.js";
import { services } from "../index.js";
import { db } from "../../db/index.js";

export const resendActivation = async (params = {}) => {
  const { client, req: { body: { email } = {} } = {} } = params;

  try {
    const user = await db?.psql?.queries?.user?.select_user_by_email({client, email})

    if (!user) utils.throw_new_error(404, "User does not exist");
    if (user?.activated) utils.throw_new_error(409, "User already activated");

    const activationCode = Math.floor(
      100000 + Math.random() * 900000
    ).toString();

    const setTokenResponse = await services.set_token({
      client,
      email,
      type: "account",
    });
    const activationToken = String(setTokenResponse);

    const updateActivationResponse = await db?.psql?.queries?.user?.update_user_activation_code_by_email({
      email,
      activationCode,
      client,
    });
    
    if (updateActivationResponse !== 1) {
      utils.throw_new_error(500, "Failed to update activation code");
    }

    const nodemailerResponse = await services.nodemailer({
      email,
      token: activationToken,
      type: "account",
      activationCode,
    });

    if (!nodemailerResponse)
      utils.throw_new_error(500, "Failed to send activation email");

    return {
      success: true,
      message:
        "An activation email with code has been sent to your email address.",
      status: 200,
    };
  } catch (error) {
    throw error;
  }
};
