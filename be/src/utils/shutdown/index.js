import { db } from "../../db/index.js";

export const shutdown = () => {
  const performGracefulShutdown = async (signal) => {
    try {
      if (db?.psql?.pool?.end) await db.psql.pool.end();
      if (db?.redis?.client?.close) await db.redis.client.close();
      process.exit(0);
    } catch (err) {
      console.error("Error during shutdown:", err);
      process.exit(1);
    }
  };

  ["SIGTERM", "SIGINT"].forEach((sig) =>
    process.on(sig, () => performGracefulShutdown(sig))
  );
  process.on("uncaughtException", (err) => performGracefulShutdown("uncaughtException"));
  process.on("unhandledRejection", () => performGracefulShutdown("unhandledRejection"));
}
