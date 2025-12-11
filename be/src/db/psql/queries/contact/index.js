const insertContact = async ({ userId, contactId, client }) => {
  const query = `
      INSERT INTO contacts (user_id, contact_id)
      VALUES ($1, $2)
      RETURNING *;
    `;
  const result = await client.query(query, [userId, contactId]);
  return result.rows?.[0];
};

const selectContactByIds = async ({ userId, contactId, client }) => {
  const query = `
      SELECT * FROM contacts
      WHERE (contact_id = $1 AND user_id = $2)
         OR (contact_id = $2 AND user_id = $1)
    `;

  const result = await client.query(query, [contactId, userId]);
  return result.rows[0];
};

const selectContactById = async ({ id, client }) => {
  const query = `
  SELECT * FROM contacts
  WHERE id = $1;
`;

  const result = await client.query(query, [id]);
  return result.rows[0];
};


const updateContactStatus = async ({ userId, contactRowId, client, status }) => {
  const blockedBy = status === "blocked" ? userId : null;

  const query = `
    UPDATE contacts
    SET status = $1,
        blocked_by = $2
    WHERE id = $3
    RETURNING *;
  `;
  const params = [status, blockedBy, contactRowId];

  const result = await client.query(query, params);
  return {
    rowCount: result.rowCount,
    row: result.rows?.[0],
  };
};


const removeContactById = async ({ contactRowId, client }) => {
  const query = `
    DELETE FROM contacts
    WHERE id = $1
  `;
  const result = await client.query(query, [contactRowId]);
  return result.rowCount;
};


const selectContactsByUserId = async ({ userId, client }) => {
  const query = `
    SELECT
      CASE 
        WHEN c.user_id = $1 THEN u2.id
        ELSE u1.id
      END AS contact_id,
      CASE 
        WHEN c.user_id = $1 THEN u2.username
        ELSE u1.username
      END AS username,
      CASE 
        WHEN c.user_id = $1 THEN true
        ELSE false
      END AS sender,
      CASE 
        WHEN c.status = 'blocked' AND c.blocked_by = $1 THEN true
        ELSE false
      END AS blocker,
      CASE
        WHEN c.status = 'blocked' AND c.blocked_by != $1 THEN true
        ELSE false
      END AS blocked,
      c.status AS status
    FROM contacts c
    JOIN users u1 ON u1.id = c.user_id
    JOIN users u2 ON u2.id = c.contact_id
    WHERE c.user_id = $1 OR c.contact_id = $1
    ORDER BY c.created_at DESC
  `;

  const { rows } = await client.query(query, [userId]);
  return rows;
};




export const contact = {
  insert_contact: insertContact,
  select_contact_by_ids: selectContactByIds,
  select_contacts_by_user_id: selectContactsByUserId,
  update_contact_status: updateContactStatus,
  select_contact_by_id: selectContactById,
  remove_contact_by_id: removeContactById,
  select_contacts_by_user_id: selectContactsByUserId
};


