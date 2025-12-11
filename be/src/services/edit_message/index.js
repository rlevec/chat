import { utils } from "../../utils/index.js";
import { db } from "../../db/index.js";
import { socket_io } from "../../socket_io/index.js";

export const editMessage = async (params = {}) => {
  const { req = {}, client, io } = params;

  const userId = req.user?.id;
  const senderId = parseInt(userId);
  const receiverId = req?.body?.contact;
  const messageId = req?.body?.message_id;
  const content = req?.body?.content;

  const updateMessage =
    await db.psql?.queries?.message?.update_message_content_by_id({
      messageId,
      messageContent: content,
      client,
    });

  if (updateMessage?.rowCount !== 1) {
    return utils.throw_new_error(
      500,
      "Error occurred during edit message DB process!"
    );
  }

  const updatedMessage = updateMessage?.row;
  const isEdited = updatedMessage?.is_edited
  const newContent = updatedMessage?.content

    await socket_io?.events?.edit_message({
    io,
    senderId,
    receiverId,
    messageId,
    content: newContent,
    isEdited
  })

  return {
    success: true,
    status: 200,
    message: "Message edited successfully!",
  };
};
