import { utils } from "../../utils/index.js";
import { db } from "../../db/index.js";
import { socket_io } from "../../socket_io/index.js";
import { services } from "../index.js";

export const sendContactRequest = async (params = {}) => {
  const { req = {}, client, io } = params;

  const currentUser = req.user;
  const userId = currentUser?.id;

  if (!userId) {
    return utils.throw_new_error(401, "Unauthorized: User not found");
  }

  const dbUser = await db.psql.queries.user.select_user_by_id({
    client,
    id: userId,
  });
  const userUsername = dbUser?.username;

  const contactUsername = req.body?.contact;
  if (!contactUsername) {
    return utils.throw_new_error(400, "Contact username is missing!");
  }
  if (userUsername === contactUsername) {
    return utils.throw_new_error(400, "You can't add yourself to contacts!");
  }

  const contact = await db.psql.queries.user.select_user_by_username({
    client,
    username: contactUsername,
  });
  if (!contact) {
    return utils.throw_new_error(400, "Contact does not exist!");
  }

  const contactUserId = contact.id;

  const existingContact = await db.psql.queries.contact.select_contact_by_ids({
    userId,
    contactId: contactUserId,
    client,
  });

  if (existingContact) {
    if (existingContact.status === "blocked") {
      if (existingContact.blocked_by === userId) {
        return utils.throw_new_error(
          400,
          "You have blocked this user. Unblock them first to send a request."
        );
      } else {
        return utils.throw_new_error(
          400,
          "You cannot send a request. You are blocked by this user."
        );
      }
    }
    if (existingContact.status === "pending") {
      return utils.throw_new_error(
        400,
        existingContact.user_id === userId
          ? "Contact request is pending!"
          : "Contact request is awaiting feedback!"
      );
    }
    if (existingContact.status === "accepted") {
      return utils.throw_new_error(400, "You are already contacts!");
    }
  }

  const newContact = await db.psql.queries.contact.insert_contact({
    userId,
    contactId: contactUserId,
    client,
  });

  if (!newContact) {
    return utils.throw_new_error(
      500,
      "Error occurred during add contact DB insert process!"
    );
  }

  const userStatus = await services?.user_status?.get_user_status({ userId });

  const contactStatus = await services?.user_status?.get_user_status({
    userId: String(contact?.id),
  });

  const requestSenderContactData = {
    contact_id: contact.id,
    username: contact?.username,
    sender: true,
    blocker:
      newContact?.status === "blocked" &&
      newContact?.blocked_by === contact?.id,
    blocked:
      newContact?.status === "blocked" &&
      newContact?.blocked_by !== contact?.id,
    status: newContact?.status,
    online: contactStatus?.online,
    last_seen: contactStatus?.lastSeen,
  };

  const requestReceiverContactData = {
    contact_id: dbUser?.id,
    username: dbUser?.username,
    sender: false,
    blocker:
      newContact?.status === "blocked" && newContact?.blocked_by === dbUser?.id,
    blocked:
      newContact?.status === "blocked" && newContact?.blocked_by !== dbUser?.id,
    status: newContact?.status,
    online: userStatus?.online,
    last_seen: userStatus?.lastSeen,
  };
  
    await socket_io?.events?.send_contact_request({
      io,
      requestSenderContactData,
      requestReceiverContactData
    })

  return {
    success: true,
    status: 200,
    message: "Contact request sent successfully!",
  };
};
