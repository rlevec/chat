import {socket_io} from "../../index.js"

export const deleteMessage = async ({
  io,
  senderId,
  receiverId,
  messageId
}) => {
  socket_io?.emit.to_user?.({
    io,
    userId: String(senderId),
    event: "delete_message",
    data: {
      messageId
    },
  });

  socket_io?.emit.to_user?.({
    io,
    userId: String(receiverId),
    event: "delete_message",
    data: {
      messageId
    },
  });
};
