import { services } from "../../services/index.js";

import { utils } from "../../utils/index.js";

export const accountActivation = async(params = {}) => {
    const { req = {}, client = undefined } = params;

    const {
        token = undefined,
        activation_code = undefined
    } = req.body

       if(!token) {
        return utils.throw_new_error(400, "Missing required token parameter.");
       }

       if(!activation_code) {
         return utils.throw_new_error(400, "Missing activation code.");
       }

       const verifyTokenResponse = await services.verify_token({
        client, type: "account", activation_code, token
       })

       if(!Boolean(verifyTokenResponse)) {
        return utils.throw_new_error(400, "Account activation token verification error!");
       }

       return {
        success: true,
        message: "You have successfully activated your account!",
        status: 200
       }
}