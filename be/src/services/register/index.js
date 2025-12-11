import { utils } from "../../utils/index.js";
import { services } from "../index.js";
import { db } from "../../db/index.js";

export const register = async (params = {}) => {
    const {
        req: { body = {} } = {},
        client
    } = params;


    const email = body?.email;
    const username = body?.username;
    const password = body?.password;

    if (!email || !username || !password) {
        return utils.throw_new_error(400, "Email, username, and password are required");
    }
    try {
        const existingEmailUser = await db.psql.queries.user.select_user_by_email({ client, email });
        if (existingEmailUser) {
          if (!existingEmailUser.activated) {
            return utils.throw_new_error(400, "Check your email for account activation email.");
          }
          return utils.throw_new_error(409, "Email is already registered");
        }
      

        const existingUsernameUser = await db.psql.queries.user.select_user_by_username({ client, username });
        if (existingUsernameUser) {
          return utils.throw_new_error(409, "Username is already taken");
        }
      

        const hashedPassword = await services.hash_password({ password });
        if (!hashedPassword) {
          return utils.throw_new_error(500, "Failed to hash password");
        }
      

        const newUser = await db.psql.queries.user.insert_user({ email, username, password: hashedPassword, client });
        if (!newUser) return utils.throw_new_error(500, "Error occurred during registration process");
      
        const newUserId = newUser.id;
      
       
        const token = await services.set_token({ type: "account", email, client });
        if (!token) return utils.throw_new_error(500, "Failed to generate token");
      
        const activationCode = Math.floor(100000 + Math.random() * 900000).toString();
      

        const nodemailerResponse = await services.nodemailer({
          email,
          token,
          type: "account",
          activationCode
        });
        if (!nodemailerResponse) return utils.throw_new_error(500, "Failed to send activation email");
      
       
        const updatedUserActivationCode = await db.psql.queries.user.update_user_activation_code({
          id: newUserId,
          activationCode,
          client,
        });
        if (updatedUserActivationCode !== 1) {
          return utils.throw_new_error(500, "Error occurred during activation code update process");
        }
      
        return {
          success: true,
          message: "You have successfully registered. An activation email with code has been sent to your email address.",
          status: 200
        };
      } catch (err) {
        return utils.throw_new_error(500, err.message || "Internal Server Error");
      }
      
};
