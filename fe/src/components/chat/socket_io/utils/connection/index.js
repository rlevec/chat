import { routes } from "../../../../../routes";

export const connect = ({ setWebSocketStatus }) => {
    console.log("WS_connect");
    setWebSocketStatus("connected");
  };
  
  export const disconnect = async ({ setWebSocketStatus, reason, socket, login, refreshTokenRequest }) => {
    console.log("WS_disconnect");
    setWebSocketStatus("disconnected");
  
    if (reason === "io server disconnect" || reason === "auth error") {
      const data = await refreshTokenRequest({
        url: routes?.server?.refresh_token,
        body: {},
      });
      const accessToken = data?.accessToken;
      if (accessToken) login(accessToken);
  
      socket.current.auth = { token: accessToken };
      socket.current.connect();
    }
  };
  
  export const connect_error = ({err}) => {
    console.error("WS_connect_error", err.message);
  };
  

  export const connection_utils = {
    connect,
    disconnect,
    connect_error
  };
  