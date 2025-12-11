import {socket_io} from "../../index.js"

export const sendMessage = async ({
  io,
  senderId,
  receiverId,
  receiverMessageData,
  senderMessageData
}) => {
  socket_io?.emit.to_user?.({
    io,
    userId: String(senderId),
    event: "send_message",
    data: {
      senderId,
      receiverId,
      message: senderMessageData,
    },
  });

  socket_io?.emit.to_user?.({
    io,
    userId: String(receiverId),
    event: "send_message",
    data: {
      senderId,
      receiverId,
      message: receiverMessageData,
    },
  });
};
