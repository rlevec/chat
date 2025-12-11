import { register } from "./register/index.js"
import { sendMail } from "./nodemailer/index.js"
import { verifyToken } from "./verify_token/index.js"
import { setToken } from "./set_token/index.js"
import { hashPassword } from "./hash_password/index.js"
import { verifyPassword } from "./verify_password/index.js"
import { accountActivation } from "./account_activation/index.js"
import { forgotPassword } from "./forgot_password/index.js"
import { resetPassword } from "./reset_password/index.js"
import { login } from "./login/index.js"
import { json_web_token } from "./json_web_token/index.js"
import { resendActivation } from "./resend_activation/index.js"
import { logout } from "./logout/index.js"
import { sendContactRequest } from "./send_contact_request/index.js"
import { declineContactRequest } from "./decline_contact_request/index.js"
import { acceptContactRequest } from "./accept_contact_request/index.js"
import { blockContact } from "./block_contact/index.js"
import { unblockContact } from "./unblock_contact/index.js"
import { removeContact } from "./remove_contact/index.js"
import { contactList } from "./contact_list/index.js"
import { uploadProfilePicture } from "./upload_profile_picture/index.js"
import { profilePicture } from "./profile_picture/index.js"
import { user } from "./user/index.js"
import { changeUsername } from "./change_username/index.js"
import { connect } from "./connect/index.js"
import { disconnect } from "./disconnect/index.js"
import { userStatus } from "./user_status/index.js"
import { sendMessage } from "./send_message/index.js"
import { editMessage } from "./edit_message/index.js"
import { deleteMessage } from "./delete_message/index.js"
import { changeEmail } from "./change_email/index.js"
import { changePassword } from "./change_password/index.js"
import { messageList } from "./message_list/index.js"

export const services = {
    register,
    set_token: setToken,
    verify_token: verifyToken,
    hash_password: hashPassword,
    verify_password: verifyPassword,
    nodemailer: sendMail,
    account_activation: accountActivation,
    forgot_password: forgotPassword,
    reset_password: resetPassword,
    login,
    json_web_token,
    resend_activation: resendActivation,
    logout,
    send_contact_request: sendContactRequest,
    contact_list: contactList,
    decline_contact_request: declineContactRequest,
    accept_contact_request: acceptContactRequest,
    block_contact: blockContact,
    unblock_contact: unblockContact,
    remove_contact: removeContact,
    upload_profile_picture: uploadProfilePicture,
    profile_picture: profilePicture,
    user,
    change_username: changeUsername,
    change_email: changeEmail,
    change_password: changePassword,
    user_status: userStatus,
    connect,
    disconnect,
    send_message: sendMessage,
    edit_message: editMessage,
    delete_message: deleteMessage,
    message_list: messageList,
}