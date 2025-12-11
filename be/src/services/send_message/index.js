import { utils } from "../../utils/index.js";
import { db } from "../../db/index.js";
import { socket_io } from "../../socket_io/index.js";
import { services } from "../index.js";

export const sendMessage = async (params = {}) => {
  const { req = {}, client, io } = params;

  const userId = req.user?.id
  const senderId = parseInt(userId)
  const receiverId = req?.body?.contact
  const messageContent = req?.body?.content

  const newMessage = await db.psql.queries.message.insert_message({
    senderId,
    receiverId,
    messageContent,
    client,
  });

  if (!newMessage) {
    return utils.throw_new_error(
      500,
      "Error occurred during insert message DB insert process!"
    );
  }

  const receiverMessageData = {
    id: newMessage?.id,
    content: newMessage?.content,
    is_edited: newMessage?.is_edited,
    is_read: newMessage?.is_read,
    type: "received",
    time: utils?.format_timestamp({timestamp: newMessage?.created_at})
  }


  const senderMessageData = {
    id: newMessage?.id,
    content: newMessage?.content,
    is_edited: newMessage?.is_edited,
    is_read: newMessage?.is_read,
    type: "sent",
    time: utils?.format_timestamp({timestamp: newMessage?.created_at})
  }
  
  await socket_io?.events?.send_message({
    io,
    senderId,
    receiverId,
    receiverMessageData,
    senderMessageData
  })

  return {
    success: true,
    status: 200,
    message: "Message sent successfully!",
  };

}