import { utils } from "../../utils/index.js";
import { db } from "../../db/index.js";
import { socket_io } from "../../socket_io/index.js";
import { services } from "../index.js";

export const removeContact = async (params = {}) => {
  const { req = {}, client, io } = params;

  const currentUser = req.user;
  const userId = currentUser?.id;
  const contactId = req?.body?.id;

  if (!userId) {
    return utils.throw_new_error(401, "Unauthorized: User not found!");
  }

  if (!contactId) {
    return utils.throw_new_error(400, "Contact not found!");
  }

  const contact = await db.psql.queries.contact?.select_contact_by_ids({
    userId,
    contactId,
    client,
  });

  if (!contact) {
    return utils.throw_new_error(400, "You are not contacts!");
  }

  const requestRemoverUser = await db.psql.queries.user.select_user_by_id({
    client,
    id: parseInt(userId),
  });

  const requestRemovedUser = await db.psql.queries.user.select_user_by_id({
    client,
    id: parseInt(contactId),
  });

  const removeContact = await db.psql?.queries?.contact?.remove_contact_by_id({
    contactRowId: contact?.id,
    client,
  });

  if (removeContact !== 1) {
    return utils.throw_new_error(
      500,
      "Error occurred during remove contact DB process!"
    );
  }

  const removedUserStatus = await services?.user_status?.get_user_status({
    userId: String(contactId),
  });

  const removerUserStatus = await services?.user_status?.get_user_status({
    userId: String(userId),
  });

  const removerContactData = {
    contact_id: requestRemovedUser.id,
    username: requestRemovedUser?.username,
    sender: requestRemovedUser.id === contact?.user_id,
    blocker:
      contact?.status === "blocked" &&
      contact?.blocked_by === requestRemovedUser?.id,
    blocked:
      contact?.status === "blocked" &&
      contact?.blocked_by !== requestRemovedUser?.id,
    status: contact?.status,
    online: removedUserStatus?.online,
    last_seen: removedUserStatus?.lastSeen,
  };

  const removedContactData = {
    contact_id: requestRemoverUser?.id,
    username: requestRemoverUser?.username,
    sender: requestRemoverUser?.id === parseInt(userId),
    blocker:
      contact?.status === "blocked" &&
      contact?.blocked_by === parseInt(userId),
    blocked:
      contact?.status === "blocked" &&
      contact?.blocked_by !== parseInt(userId),
    status: contact?.status,
    online: removerUserStatus?.online,
    last_seen: removerUserStatus?.lastSeen,
  };

     await socket_io?.events?.remove_contact({
      io,
      removedContactData,
      removerContactData
     })
  

  return {
    success: true,
    status: 200,
    message: "Contact request removed successfully!",
  };
};
