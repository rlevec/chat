import { db } from "../../db/index.js";
import { utils } from "../../utils/index.js";
import { services } from "../index.js";

export const connect = async({userId}) => {


    const client = await db.psql.pool.connect();
  
    try {
      await services?.user_status?.update_user_status({ userId: String(userId), type: "connect" });
  
      const contacts = await db.psql.queries.contact.select_contacts_by_user_id({
        userId,
        client,
      });
  
      const contactIds = contacts.map((c) =>
        String(c?.contact_id) === String(userId) ? String(c?.user_id) : String(c?.contact_id)
      );
  
      const user = await db.psql.queries.user.select_user_by_id({ id: userId, client });

      const userConnectSocketData = {
        userIds: contactIds,
        data: {
            userId,
            online: true,
            lastSeen: utils?.format_timestamp({timestamp: Date.now()}),
            message: `${user?.username} is online!`,
          },
      }

      const userAckSocketData = {
        userIds: [userId],
        data: {
            online: true,
            lastSeen: Date.now(),
            userId,
            message: "You have successfully connected!",
          },
      }
  
       return {
        userConnectSocketData,
        userAckSocketData
       }
    } catch (err) {
      utils.throw_new_error(500, "Unknown error in connect handler")
    } finally {
      client.release();
    }
}