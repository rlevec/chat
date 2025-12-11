import {socket_io} from "../../index.js"

export const removeContact = async ({
  io,
  removedContactData,
  removerContactData
}) => {

  socket_io?.emit.to_user?.({
    io,
    userId: String(removedContactData?.contact_id),
    event: "remove_contact",
    data: {
      message: `You have removed ${removerContactData?.username} from your contacts.`,
      contact: removerContactData,
    },
  });


  socket_io?.emit.to_user?.({
    io,
    userId: String(removerContactData?.contact_id),
    event: "remove_contact",
    data: {
      message: `You have been removed from ${removedContactData?.username}'s contacts.`,
      contact: removedContactData,
    },
  });
};
