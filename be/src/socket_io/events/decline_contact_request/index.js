import { socket_io } from "../../index.js";

export const declineContactRequest = async ({
  io,
  requestAwaiterContactData,
  requestDeclinerContactData,
}) => {
  socket_io?.emit.to_user?.({
    io,
    userId: String(requestAwaiterContactData?.contact_id),
    event: "contact_request_declined",
    data: {
      message: `You have declined ${requestDeclinerContactData?.username} contact request!`,
      contact: requestDeclinerContactData,
    },
  });

  socket_io?.emit.to_user?.({
    io,
    userId: String(requestDeclinerContactData?.contact_id),
    event: "contact_request_declined",
    data: {
      message: `Your contact request has been declined by ${requestAwaiterContactData?.username}`,
      contact: requestAwaiterContactData,
    },
  });
};
