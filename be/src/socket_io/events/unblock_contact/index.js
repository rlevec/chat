import {socket_io} from "../../index.js"
export const unblockContact = async ({
  io,
  unblockedContactData,
  unblockerContactData,
}) => {

  socket_io?.emit.to_user?.({
    io,
    userId: String(unblockedContactData?.contact_id),
    event: "unblock_contact",
    data: {
      message: `You have unblocked ${unblockerContactData?.username}!`,
      contact: unblockerContactData,
    },
  });

  socket_io?.emit.to_user?.({
    io,
    userId: String(unblockerContactData?.contact_id),
    event: "unblock_contact",
    data: {
      message: `You have been unblocked by ${unblockedContactData?.username}`,
      contact: unblockedContactData,
    },
  });
};
