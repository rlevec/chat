import { login } from "./login/index.js"
import {accountActivation} from "./account_activation/index.js"
import {register} from "./register/index.js"
import {forgotPassword} from "./forgot_password/index.js"
import {resetPassword} from "./reset_password/index.js"
import { resendActivation } from "./resend_activation/index.js"
import { uploadProfilePicture } from "./upload_profile_picture/index.js"
import {changeUsername} from "./change_username/index.js"
import {changeEmail} from "./change_email/index.js"
import {changePassword} from "./change_password/index.js"
import {chat} from "./chat/index.js"

export const data = {
    login,
    register,
    account_activation: accountActivation,
    forgot_password: forgotPassword,
    reset_password: resetPassword,
    resend_activation: resendActivation,
    upload_profile_picture: uploadProfilePicture,
    change_username: changeUsername,
    change_email: changeEmail,
    change_password: changePassword,
    chat
}