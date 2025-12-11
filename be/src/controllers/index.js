import { login } from "./login/index.js";
import { register } from "./register/index.js";
import { forgotPassword } from "./forgot_password/index.js";
import { resetPassword } from "./reset_password/index.js";
import { accountActivation } from "./account_activation/index.js";
import { refreshToken } from "./refresh_token/index.js";
import { resendActivation } from "./resend_activation/index.js";
import { logout } from "./logout/index.js";
import { chat } from "./chat/index.js";
import { sendContactRequest } from "./send_contact_request/index.js";
import { declineContactRequest } from "./decline_contact_request/index.js";
import { acceptContactRequest } from "./accept_contact_request/index.js";
import { contactList } from "./contact_list/index.js";
import { blockContact } from "./block_contact/index.js";
import { unblockContact } from "./unblock_contact/index.js";
import { removeContact } from "./remove_contact/index.js";
import { uploadProfilePicture } from "./upload_profile_picture/index.js";
import { profilePicture } from "./profile_picture/index.js";
import { user } from "./user/index.js";
import { changeEmail } from "./change_email/index.js";
import { changeUsername } from "./change_username/index.js";
import { changePassword } from "./change_password/index.js";
import { sendMessage } from "./send_message/index.js";
import { messageList } from "./message_list/index.js";
import { deleteMessage } from "./delete_message/index.js";
import { editMessage } from "./edit_message/index.js";

export const controllers = {
  login,
  register,
  forgot_password: forgotPassword,
  reset_password: resetPassword,
  account_activation: accountActivation,
  refresh_token: refreshToken,
  resend_activation: resendActivation,
  logout,
  chat,
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
  change_email: changeEmail,
  change_username: changeUsername,
  change_password: changePassword,
  change_email: changeEmail,
  send_message: sendMessage,
  message_list: messageList,
  delete_message: deleteMessage,
  edit_message: editMessage,
};
