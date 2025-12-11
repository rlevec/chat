import { utils } from "../../utils/index.js";
import { db } from "../../db/index.js";
import { socket_io } from "../../socket_io/index.js";
import { services } from "../index.js";

export const declineContactRequest = async (params = {}) => {
  const { req = {}, client, io } = params;

  const currentUser = req.user;
  const userId = currentUser?.id;
  const contactId = req?.body?.id


  if (!userId) {
    return utils.throw_new_error(401, "Unauthorized: User not found!");
  }

  if(!contactId) {
    return utils.throw_new_error(400, "Contact not found!");
  }

   const contact = await db.psql.queries.contact?.select_contact_by_ids({userId, contactId, client})

 

   if(!contact) {
    return utils.throw_new_error(400, "You are not contacts!");
   }
  

   const requestDeclinerContact = await db.psql.queries.user.select_user_by_id({ client, id: parseInt(userId) });
   const requestAwaiterContact = await db.psql.queries.user.select_user_by_id({ client, id: contactId });

   
   const removeContact = await db.psql?.queries?.contact?.remove_contact_by_id({
    contactRowId: contact?.id,
    client})

    if(removeContact !== 1) {
      return utils.throw_new_error(500, "Error occurred during remove contact DB process!");
    }


    const contactStatus = await services?.user_status?.get_user_status({
      userId: String(contactId),
    });

    const userStatus = await services?.user_status?.get_user_status({
      userId: String(userId),
    });
  
    const requestDeclinerContactData = {
      contact_id: requestAwaiterContact.id,
      username: requestAwaiterContact?.username,
      sender: requestAwaiterContact.id === contact?.user_id,
      blocker:
      contact?.status === "blocked" &&
      contact?.blocked_by === requestAwaiterContact?.id,
      blocked:
      contact?.status === "blocked" &&
      contact?.blocked_by !== contact?.id,
      status: contact?.status,
      online: contactStatus?.online,
      last_seen: contactStatus?.lastSeen,
    };
  
    const requestAwaiterContactData = {
      contact_id: requestDeclinerContact?.id,
      username: requestDeclinerContact?.username,
      sender: requestDeclinerContact?.id === parseInt(userId),
      blocker:
      contact?.status === "blocked" && contact?.blocked_by === parseInt(userId),
      blocked: contact?.status === "blocked" && contact?.blocked_by !== parseInt(userId),
      status: contact?.status,
      online: userStatus?.online,
      last_seen: userStatus?.lastSeen,
    };


      await socket_io?.events?.decline_contact_request({
        io,
        requestAwaiterContactData,
        requestDeclinerContactData,
      })

  return {
    success: true,
    status: 200,
    message: "Contact request declined successfully!",
  };
};
