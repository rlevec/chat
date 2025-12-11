import { utils } from "../../utils/index.js";
import { db } from "../../db/index.js";
import { socket_io } from "../../socket_io/index.js";

export const deleteMessage = async (params = {}) => {
  const { req = {}, client, io } = params;

  const userId = req.user?.id
  const senderId = parseInt(userId)
  const receiverId = req?.body?.contact
  const messageId = req?.body?.message_id

  const deleteMessage = await db.psql?.queries?.message?.delete_message_by_id({
    messageId,
    client,
  });

  if (deleteMessage !== 1) {
    return utils.throw_new_error(
      500,
      "Error occurred during delete message DB process!"
    );
  }
  
  await socket_io?.events?.delete_message({
    io,
    senderId,
    receiverId,
    messageId
  })

  return {
    success: true,
    status: 200,
    message: "Message deleted successfully!",
  };

}