import { utils } from "../../utils/index.js";
import { db } from "../../db/index.js";
import { socket_io } from "../../socket_io/index.js";
import { services } from "../index.js";

export const blockContact = async (params = {}) => {
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

  const blockSenderUser = await db.psql.queries.user.select_user_by_id({
    client,
    id: parseInt(id),
  });

  const blockRecevierUser = await db.psql.queries.user.select_user_by_id({
    client,
    id: parseInt(userId),
  });

  const blockSenderUserStatus = await services?.user_status?.get_user_status({
    userId: String(blockSenderUser?.id),
  });

  const blockRecevierUserStatus = await services?.user_status?.get_user_status({
    userId: String(blockRecevierUser?.id),
  });

  const updateContact = await db.psql?.queries?.contact?.update_contact_status({
    userId: Number(userId),
    contactRowId: contact?.id,
    client,
    status: "blocked",
  });

  if (updateContact?.rowCount !== 1) {
    return utils.throw_new_error(
      500,
      "Error occurred during update contact status DB process!"
    );
  }

  const updatedContact = updateContact?.row;

  const blockerContactData = {
    contact_id: blockSenderUser.id,
    username: blockSenderUser?.username,
    sender: blockSenderUser.id === updatedContact?.user_id,
    blocker:
      updatedContact?.status === "blocked" &&
      updatedContact?.blocked_by === blockRecevierUser?.id,
    blocked:
      updatedContact?.status === "blocked" &&
      updatedContact?.blocked_by !== blockRecevierUser?.id,
    status: updatedContact?.status,
    online: blockSenderUserStatus?.online,
    last_seen: blockSenderUserStatus?.lastSeen,
  };

  const blockedContactData = {
    contact_id: blockRecevierUser?.id,
    username: blockRecevierUser?.username,
    sender: blockRecevierUser?.id === updatedContact?.user_id,
    blocker:
      updatedContact?.status === "blocked" &&
      updatedContact?.blocked_by === blockSenderUser?.id,
    blocked:
      updatedContact?.status === "blocked" &&
      updatedContact?.blocked_by !== blockSenderUser?.id,
    status: updatedContact?.status,
    online: blockRecevierUserStatus?.online,
    last_seen: blockRecevierUserStatus?.lastSeen,
  };


  await socket_io?.events?.block_contact({
    io,
    blockedContactData,
    blockerContactData
  })


  return {
    success: true,
    status: 200,
    message: "Contact blocked successfully!",
  };
};
