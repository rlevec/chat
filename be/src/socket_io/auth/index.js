import { services } from "../../services/index.js";

export const auth = async ({ socket, next }) => {
  const token = socket.handshake.auth.token;

  if (!token) {
    return next(new Error("Access token missing"));
  }

  try {
    const payload = await services.json_web_token.verify({
      token,
      type: "access",
    });

    //attach user info to socket
    socket.user = payload; 

    //join a room with the user's ID for easy private messaging
    //emits to id / ids then instead of socket / sockets
    socket.join(payload.id);

    next();
  } catch (err) {
    console.error("JWT auth failed:", err);
    return next(new Error("Access token invalid or expired"));
  }
};
