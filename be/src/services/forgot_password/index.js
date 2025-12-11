import { utils } from "../../utils/index.js";

import { services } from "../index.js";

import { db } from "../../db/index.js";

export const forgotPassword = async(params = {}) => {
    const { req = {}, client = undefined } = params;

    const email = req?.body?.email;

    if (!email) {
        return utils.throw_new_error(400, "Email is required");
    }

    const user = db?.psql?.queries?.user?.select_user_by_email({client, email})

    if (!user) {
        return utils.throw_new_error(400, "Invalid credentials");
    }

    try {

        const userId = user?.id

        const token = await services.set_token({ type: "password", email, client });
        if (!token) return utils.throw_new_error(500, "Failed to generate token");

        const activationCode = Math.floor(100000 + Math.random() * 900000).toString();

        const nodemailerResponse = await services.nodemailer({
            email,
            token,
            type: "password",
            activationCode
        });
        if (!nodemailerResponse) return utils.throw_new_error(500, "Failed to send activation email");

        const resetPasswordCodeUpdated = await db?.psql?.queries?.user?.update_user_password_reset_code({ id: userId, resetCode:activationCode, client });

        if (resetPasswordCodeUpdated === 0) {
            return utils.throw_new_error(500, "Error occurred during activation code update process");
        }

        return {
            success: true,
            message: "An reset email with code has been sent to your email address.",
            status: 200
        };

      
    } catch (err) {
        return utils.throw_new_error(500, err.message || "Internal Server Error");
    }

}