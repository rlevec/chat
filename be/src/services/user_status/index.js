import { db } from "../../db/index.js";

import { utils } from "../../utils/index.js";
 
const updateUserStatus = async ({ userId, type }) => {
    if (!userId || !type) return false;
  
    const status = type === "connect" ? "online" : "offline";
    const timestamp = Date.now();
  
    try {
      await db?.redis?.utils?.hset({ key: "user_status", field: userId, value: status });
  
      await db?.redis?.utils?.hset({ key: "user_last_seen", field: userId, value: timestamp });
  
      return true;
    } catch (err) {
      console.error("Redis user status update error:", err);
      return false;
    }
  };


  const getUserStatus = async ({userId}) => {
    if (!userId) return null;
  
    try {
      const status = await db?.redis?.utils?.hget({ key: "user_status", field: userId });
      const lastSeen = await db?.redis?.utils?.hget({ key: "user_last_seen", field: userId });

      const lastSeenReadable = utils?.format_timestamp({timestamp: lastSeen})
  
      return {
        userId,
        status: status || "offline",
        lastSeen: lastSeenReadable,
        online: status === "online",
      };
    } catch (err) {
      console.error("Redis getUserStatus error:", err);
      return null;
    }
  };
  

const getUsersStatuses = async ({userIds = []}) => {
    if (!Array.isArray(userIds) || userIds.length === 0) return [];
  
    try {
      const results = await Promise.all(userIds.map((id) => getUserStatus({userId: id})));
      return results.filter(Boolean);
    } catch (err) {
      console.error("Redis getUsersStatuses error:", err);
      return [];
    }
  };

export const userStatus = {
  update_user_status: updateUserStatus,
  get_user_status: getUserStatus,
  get_users_statuses: getUsersStatuses
}