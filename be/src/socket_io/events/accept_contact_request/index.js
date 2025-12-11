import { socket_io } from "../../index.js";

export const acceptContactRequest = async ({
  io,
  accepterContactData,
  senderContactData,
}) => {
  socket_io?.emit.to_user?.({
    io,
    userId: String(senderContactData?.contact_id),
    event: "contact_request_accepted",
    data: {
      message: `You have accepted ${accepterContactData?.username}'s contact request!`,
      contact: accepterContactData,
    },
  });

  socket_io?.emit.to_user?.({
    io,
    userId: String(accepterContactData?.contact_id),
    event: "contact_request_accepted",
    data: {
      message: `Your contact request has been accepted by ${senderContactData?.username}.`,
      contact: senderContactData,
    },
  });
};
