import { utils } from "../../utils/index.js";
import { db } from "../../db/index.js";
import { services } from "../../services/index.js";

export const messageList = async (params = {}) => {
  const { req = {}, client = undefined, io } = params;

  const currentUser = req.user;
  const userId = currentUser?.id;
  const contactId = req.params.id;

  if (!userId) {
    return utils.throw_new_error(401, "Unauthorized: User not found");
  }

  if (!contactId) {
    return utils?.throw_new_error(400, "Contact not found");
  }

  const messageList = await db.psql.queries.message?.get_message_list({
    userId: parseInt(userId),
    contactId: parseInt(contactId),
    client,
  });

  const enrichedMessageList = messageList?.map((messageEntry) => {
    const { created_at, ...rest } = messageEntry;

    return {
      ...rest,
      time: utils?.format_timestamp({ timestamp: messageEntry?.created_at }),
    };
  });

  return {
    status: 200,
    success: true,
    message: "Messages fetched successfully",
    data: enrichedMessageList ?? [],
  };
};
