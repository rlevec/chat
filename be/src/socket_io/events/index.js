import { acceptContactRequest } from "./accept_contact_request/index.js"
import { blockContact } from "./block_contact/index.js"
import { declineContactRequest } from "./decline_contact_request/index.js"
import { unblockContact } from "./unblock_contact/index.js"
import { removeContact } from "./remove_contact/index.js"
import { sendContactRequest } from "./send_contact_request/index.js"
import { changeUsername } from "./change_username/index.js"
import { sendMessage } from "./send_message/index.js"
import { deleteMessage } from "./delete_message/index.js"
import { editMessage } from "./edit_message/index.js"

export const events = {
    accept_contact_request: acceptContactRequest,
    block_contact: blockContact,
    decline_contact_request: declineContactRequest,
    unblock_contact: unblockContact,
    remove_contact: removeContact,
    send_contact_request: sendContactRequest,
    change_username: changeUsername,
    send_message: sendMessage,
    delete_message: deleteMessage,
    edit_message: editMessage
}