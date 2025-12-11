import { socket_io } from "../../index.js";

export const changeUsername = async({
    io,
    userIds,
    data,
  }) => {
    socket_io?.emit.to_users?.({
        io,
        userIds,
        event: "change_username",
        data: {
          message: `${data?.oldUsername} changed their username to ${data?.newUsername}!`,
          contact: {...data?.contact},
        },
      });
}