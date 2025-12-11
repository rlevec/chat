import { utils } from "../../utils/index.js";
import { db } from "../../db/index.js";
import { socket_io } from "../../socket_io/index.js";
import { services } from "../index.js";

export const acceptContactRequest = async (params = {}) => {
  const { req = {}, client, io } = params;

  const currentUser = req.user;
  const userId = currentUser?.id;
  const id = req?.body?.id;

  if (!userId) {
    return utils.throw_new_error(401, "Unauthorized: User not found!");
  }

  if (!id) {
    return utils.throw_new_error(400, "Contact match not found!");
  }

  const contact = await db.psql.queries.contact?.select_contact_by_ids({
    userId: parseInt(userId),
    contactId: id,
    client,
  });

  const requestSenderUser = await db.psql.queries.user.select_user_by_id({
    client,
    id: parseInt(id),
  });

  const requestAccepterUser = await db.psql.queries.user.select_user_by_id({
    client,
    id: parseInt(userId),
  });

  const requestSenderUserStatus = await services?.user_status?.get_user_status({
    userId: String(requestSenderUser?.id),
  });

  const requestAccepterUserStatus = await services?.user_status?.get_user_status({
    userId: String(requestAccepterUser?.id),
  });

  const updateContact = await db.psql?.queries?.contact?.update_contact_status({
    userId: Number(userId),
    contactRowId: contact?.id,
    client,
    status: "accepted",
  });

  if (updateContact?.rowCount !== 1) {
    return utils.throw_new_error(
      500,
      "Error occurred during update contact status DB process!"
    );
  }

  const updatedContact = updateContact?.row;

  const accepterContactData = {
    contact_id: requestSenderUser.id,
    username: requestSenderUser?.username,
    sender: requestSenderUser.id === updatedContact?.user_id,
    blocker:
      updatedContact?.status === "blocked" &&
      updatedContact?.blocked_by === requestSenderUser?.id,
    blocked:
      updatedContact?.status === "blocked" &&
      updatedContact?.blocked_by !== requestSenderUser?.id,
    status: updatedContact?.status,
    online: requestSenderUserStatus?.online,
    last_seen: requestSenderUserStatus?.lastSeen,
  };

  const senderContactData = {
    contact_id: requestAccepterUser?.id,
    username: requestAccepterUser?.username,
    sender: requestAccepterUser?.id === updatedContact?.user_id,
    blocker:
      updatedContact?.status === "blocked" &&
      updatedContact?.blocked_by === requestAccepterUser?.id,
    blocked:
      updatedContact?.status === "blocked" &&
      updatedContact?.blocked_by !== requestAccepterUser?.id,
    status: updatedContact?.status,
    online: requestAccepterUserStatus?.online,
    last_seen: requestAccepterUserStatus?.lastSeen,
  };


     await socket_io?.events?.accept_contact_request({
      io,
      accepterContactData,
      senderContactData,
     })


  return {
    success: true,
    status: 200,
    message: "Contact request accepted successfully!",
  };
};
