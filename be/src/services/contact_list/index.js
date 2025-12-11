import { utils } from "../../utils/index.js";

import { db } from "../../db/index.js";

import { services } from "../index.js";

export const contactList = async (params = {}) => {
  const { req = {}, client = undefined } = params;

  const currentUser = req.user;
  const userId = currentUser?.id;

  if (!userId) {
    return utils.throw_new_error(401, "Unauthorized: User not found");
  }

  const contactList =
    await db.psql.queries.contact?.select_contacts_by_user_id({
      client,
      userId,
    });


  const ids = contactList?.map((contactListEntry) =>
    String(contactListEntry?.contact_id)
  );

  const statuses = {};

  const userStatuses = await services?.user_status?.get_users_statuses({
    userIds: ids,
  });

  if (userStatuses?.length > 0) {
    for (let i = 0; i < userStatuses?.length; i++) {
      const userStatus = userStatuses?.[i];

      if (userStatus) {
        const id = userStatus?.userId;
        const online = userStatus?.online;
        const last_seen = userStatus?.lastSeen;

        statuses[id] = {
          online,
          last_seen,
        };
      }
    }
  }

  const enrichedContactList = contactList?.map((contactListEntry) => ({
    ...contactListEntry,
    online: statuses?.[String(contactListEntry?.contact_id)]?.online,
    last_seen: statuses?.[String(contactListEntry?.contact_id)]?.last_seen,
  }));


  if (!enrichedContactList) {
    return utils.throw_new_error(400, "Contact list is empty!");
  }

  return {
    success: true,
    status: 200,
    message: "You have successfully fetched contact list!",
    data: enrichedContactList ?? [],
  };
};
