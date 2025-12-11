import {socket_io} from "../../index.js"

export const editMessage = async ({
  io,
  senderId,
  receiverId,
  messageId,
  content,
  isEdited
}) => {

  socket_io?.emit.to_user?.({
    io,
    userId: String(senderId),
    event: "edit_message",
    data: {
      messageId,
      content,
      isEdited
    },
  });

  socket_io?.emit.to_user?.({
    io,
    userId: String(receiverId),
    event: "edit_message",
    data: {
      messageId,
      content,
      isEdited
    },
  });
};
