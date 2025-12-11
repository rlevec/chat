import {socket_io} from "../../index.js"

export const blockContact = async ({
  io,
  blockedContactData,
  blockerContactData
}) => {

  socket_io?.emit.to_user?.({
    io,
    userId: String(blockedContactData?.contact_id),
    event: "block_contact",
    data: {
      message: `You have blocked ${blockerContactData?.username}!`,
      contact: blockerContactData,
    },
  });

  socket_io?.emit.to_user?.({
    io,
    userId: String(blockerContactData?.contact_id),
    event: "block_contact",
    data: {
      message: `You have been blocked by ${blockedContactData?.username}`,
      contact: blockedContactData,
    },
  });
};
