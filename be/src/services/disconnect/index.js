import { db } from "../../db/index.js";
import { utils } from "../../utils/index.js";
import { services } from "../index.js";

export const disconnect = async ({ userId }) => {

  const client = await db.psql.pool.connect();

  try {
    await services?.user_status?.update_user_status({ userId: String(userId), type: "disconnect" });

    const contacts = await db.psql.queries.contact.select_contacts_by_user_id({
      userId,
      client,
    });

    const contactIds = contacts.map((c) =>
      String(c?.contact_id) === userId ? String(c?.user_id) : String(c?.contact_id)
    );

    const user = await db.psql.queries.user.select_user_by_id({ id: userId, client });


    const userDisconnectSocketData = {
        userIds: contactIds,
        data: {
            lastSeen: utils?.format_timestamp({timestamp: Date.now()}),
            online: false,
            userId,
            message: `${user?.username} disconnected!`,
          },
      }

      return {
        userDisconnectSocketData
      }
  } catch (err) {
    console.error("Error in disconnect handler:", err);
    utils.throw_new_error(500, "Unknown error in disconnect handler")
  } finally {
    client.release();
  }
};
