import {socket_io} from "../../socket_io/index.js"
import { services } from "../../services/index.js";

export const disconnect = async ({ socket, io }) => {
  const userId = socket?.user?.id;
  console.log(`Socket disconnected: ${socket.id} (userId: ${userId})`);

  if (!userId) return;
  
  const disconnectResponse = await services?.disconnect({userId})

  if(disconnectResponse?.userDisconnectSocketData) {
      const userIds = disconnectResponse?.userDisconnectSocketData?.userIds
      const data  = disconnectResponse?.userDisconnectSocketData?.data

      if(userIds?.length > 0 && data) {
        socket_io?.emit.to_users({
          io,
          userIds,
          event: "user_disconnected",
          data,
        });
      }
  }
};
