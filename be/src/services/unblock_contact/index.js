import { utils } from "../../utils/index.js";
import { db } from "../../db/index.js";
import { socket_io } from "../../socket_io/index.js";
import { services } from "../index.js";

export const unblockContact = async (params = {}) => {
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

  const unblockReceiverUser = await db.psql.queries.user.select_user_by_id({
    client,
    id: parseInt(id)
  });
  const unblockSenderUser = await db.psql.queries.user.select_user_by_id({
    client,
    id: parseInt(userId)
  });

  const unblockSenderUserStatus = await services?.user_status?.get_user_status({
    userId: String(unblockSenderUser?.id),
  });

  const unblockReceiverUserStatus = await services?.user_status?.get_user_status({
    userId: String(unblockReceiverUser?.id),
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

  const unblockerContactData = {
    contact_id: unblockReceiverUser.id,
    username: unblockReceiverUser?.username,
    sender: unblockReceiverUser.id === updatedContact?.user_id,
    blocker:
      updatedContact?.status === "blocked" &&
      updatedContact?.blocked_by === unblockReceiverUser?.id,
    blocked:
      updatedContact?.status === "blocked" &&
      updatedContact?.blocked_by !== unblockReceiverUser?.id,
    status: updatedContact?.status,
    online: unblockReceiverUserStatus?.online,
    last_seen: unblockReceiverUserStatus?.lastSeen,
  };

  const unblockedContactData = {
    contact_id: unblockSenderUser?.id,
    username: unblockSenderUser?.username,
    sender: unblockSenderUser?.id === updatedContact?.user_id,
    blocker:
      updatedContact?.status === "blocked" &&
      updatedContact?.blocked_by === unblockSenderUser?.id,
    blocked:
      updatedContact?.status === "blocked" &&
      updatedContact?.blocked_by !== unblockSenderUser?.id,
    status: updatedContact?.status,
    online: unblockSenderUserStatus?.online,
    last_seen: unblockSenderUserStatus?.lastSeen,
  };

  
    await socket_io?.events?.unblock_contact({
      io,
      unblockedContactData,
      unblockerContactData,
    })

  return {
    success: true,
    status: 200,
    message: "Contact unblocked successfully!",
  };
};
