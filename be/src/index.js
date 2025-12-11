import http from "http";
import express from "express";
import { Server } from "socket.io";
import { createAdapter as redisAdapter } from "@socket.io/redis-adapter";
import { db } from "./db/index.js";
import { config } from "./config/index.js";
import { router } from "./router/index.js";
import { middlewares } from "./middlewares/index.js";
import { utils } from "./utils/index.js";
import { socket_io } from "./socket_io/index.js";
import cookieParser from "cookie-parser";

const PORT = config?.server_port ?? 6060;

const app = express();

app.use((req, res, next) => {
  if (req.path === "/upload_profile_picture" && req.method === "POST") {
    return next();
  }
  express.json({ limit: "50mb" })(req, res, next);
});

app.use(cookieParser());

const httpServer = http.createServer(app);

const io = new Server(httpServer, {
  cors: { origin: "*" }
});

const startServer = async () => {
  try {

    await db.redis.init();
    io.adapter(redisAdapter(db.redis.client, db.redis.subscriber));

    await db.psql.init();

    router({ app, io });

    app.use(middlewares?.error);
    app.use(middlewares?.timeout);

    io.use((socket, next) => socket_io?.auth({ socket, next }));

    io.on("connect", async (socket) => {
      socket_io?.connect({ socket, io });

      socket.on("disconnect", async () => {
        socket_io?.disconnect({ socket, io });
      });
    });

    httpServer.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
      console.log(`Process ID: ${process.pid}`);
    });

    utils?.shutdown();

  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
};

startServer();