import {socket_io} from "../../index.js"

export const sendContactRequest = async ({
  io,
  requestSenderContactData,
  requestReceiverContactData
}) => {
  socket_io?.emit.to_user?.({
    io,
    userId: String(requestSenderContactData?.contact_id),
    event: "contact_request_received",
    data: {
      message: `${requestSenderContactData?.username} sent you a contact request!`,
      contact: requestReceiverContactData,
    },
  });

  socket_io?.emit.to_user?.({
    io,
    userId: String(requestReceiverContactData?.contact_id),
    event: "contact_request_sent",
    data: {
      message: `You have successfully sent ${requestSenderContactData?.username} a contact request!`,
      contact: requestSenderContactData,
    },
  });
};
