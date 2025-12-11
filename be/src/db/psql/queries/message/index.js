const insertMessage = async ({
  senderId,
  receiverId,
  messageContent,
  client,
}) => {
  const query = `
        INSERT INTO messages (sender_id, receiver_id, content)
        VALUES ($1, $2, $3)
        RETURNING *;
      `;
  const result = await client.query(query, [
    senderId,
    receiverId,
    messageContent,
  ]);
  return result.rows?.[0];
};

const getMessageList = async ({ userId, contactId, client }) => {
  const query = `
      SELECT 
        id,
        content,
        created_at,
        is_edited,
        is_read,
        CASE
          WHEN sender_id = $1 THEN 'sent'
          ELSE 'received'
        END AS type
      FROM messages
      WHERE (sender_id = $1 AND receiver_id = $2)
         OR (sender_id = $2 AND receiver_id = $1)
      ORDER BY created_at ASC;
    `;
  const result = await client.query(query, [userId, contactId]);
  return result.rows;
};

const deleteMessageById = async ({ messageId, client }) => {
  const query = `
      DELETE FROM messages
      WHERE id = $1
    `;
  const result = await client.query(query, [messageId]);
  return result.rowCount;
};

const updateMessageContentById = async ({ messageId, messageContent, client }) => {
  const query = `
    UPDATE messages
    SET content = $1, is_edited = $2
    WHERE id = $3
    RETURNING *;
  `;

  const params = [messageContent, true, messageId];

  const result = await client.query(query, params);

  return {
    rowCount: result.rowCount,
    row: result.rows?.[0]
  };
};




export const message = {
  insert_message: insertMessage,
  get_message_list: getMessageList,
  delete_message_by_id: deleteMessageById,
  update_message_content_by_id: updateMessageContentById
};
