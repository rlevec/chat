import {socket_io} from "../../socket_io/index.js"
import { services } from "../../services/index.js";

export const connect = async ({ socket, io }) => {
  const userId = socket?.user?.id;
  console.log(`Socket connected: ${socket.id} (userId: ${userId})`);

  if (!userId) return;
  
  const connectResponse = await services?.connect({userId})

  if(connectResponse?.userConnectSocketData) {
      const userIds = connectResponse?.userConnectSocketData?.userIds
      const data  = connectResponse?.userConnectSocketData?.data

      if(userIds?.length > 0 && data) {
        socket_io?.emit.to_users({
          io,
          userIds,
          event: "user_connected",
          data,
        });
      }
  }

  if(connectResponse?.userAckSocketData) {
    const userIds = connectResponse?.userAckSocketData?.userIds
    const data  = connectResponse?.userAckSocketData?.data
    if(userIds?.length > 0 && data) {
      socket_io?.emit.to_users({
        io,
        userIds,
        event: "connection_ack",
        data
      });
    }
  }
};
