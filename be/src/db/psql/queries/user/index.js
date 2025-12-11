const insertUser = async ({ email, username, password, client }) => {
  const query = `
    INSERT INTO users (email, username, password)
    VALUES ($1, $2, $3)
    RETURNING *;
  `;
  const result = await client.query(query, [email, username, password]);
  return result.rows[0];
};

const updateUserActivationCode = async ({ id, activationCode, client }) => {
  const query = `
    UPDATE users
    SET activation_code = $1
    WHERE id = $2
  `;
  const result = await client.query(query, [activationCode, id]);
  return result.rowCount;
};

const updateUserUsername = async ({ id, username, client }) => {
  const query = `
    UPDATE users
    SET username = $1
    WHERE id = $2
  `;
  const result = await client.query(query, [username, id]);
  return result.rowCount;
};

const updateUserEmail = async ({ id, email, client }) => {
  const query = `
    UPDATE users
    SET email = $1
    WHERE id = $2
  `;
  const result = await client.query(query, [email, id]);
  return result.rowCount;
};

const updateUserActivationCodeByEmail = async ({ email, activationCode, client }) => {
  const query = `
    UPDATE users
    SET activation_code = $1
    WHERE email = $2
  `;
  const result = await client.query(query, [activationCode, email]);
  return result.rowCount;
};

const selectUserByUsername = async ({ username, client }) => {
  const query = `SELECT * FROM users WHERE username = $1`;
  const result = await client.query(query, [username]);
  return result.rows[0];
};

const selectUserByEmail = async ({ email, client }) => {
  const query = `SELECT * FROM users WHERE email = $1`;
  const result = await client.query(query, [email]);
  return result.rows[0];
};

const selectUserById = async ({ id, client }) => {
  const query = `SELECT * FROM users WHERE id = $1`;
  const result = await client.query(query, [id]);
  return result.rows[0];
};

const selectProfilePictureById = async ({ id, client }) => {
  const query = `SELECT profile_picture FROM users WHERE id = $1`;
  const result = await client.query(query, [id]);
  return result.rows[0];
};

const selectUserByEmailOrUsername = async ({ identifier, client }) => {
  const query = `
    SELECT * FROM users
    WHERE email = $1 OR username = $1
  `;
  const result = await client.query(query, [identifier]);
  return result.rows[0];
};

const updateUserPasswordResetCode = async ({ id, resetCode, client }) => {
  const query = `UPDATE users SET reset_code = $1 WHERE id = $2`;
  const result = await client.query(query, [resetCode, id]);
  return result.rowCount;
};

const updateUserActivationToken = async ({ id, token, expires, client }) => {
  const query = `
      UPDATE users 
      SET activation_token = $1, activation_expires = $2 
      WHERE id = $3
    `;
  const result = await client.query(query, [token, expires, id]);
  return result.rowCount;
};

const updateUserPasswordToken = async ({ id, token, expires, client }) => {
  const query = `
      UPDATE users 
      SET reset_password_token = $1, reset_password_expires = $2 
      WHERE id = $3
    `;
  const result = await client.query(query, [token, expires, id]);
  return result.rowCount;
};


const selectUserByToken = async ({ token, type, client }) => {
  const tokenField = type === "account" ? "activation_token" : "reset_password_token";
  const expiresField = type === "account" ? "activation_expires" : "reset_password_expires";

  const query = `
    SELECT * FROM users
    WHERE ${tokenField} = $1
    AND ${expiresField} > NOW()
  `;

  const result = await client.query(query, [token]);
  return result.rows[0];
};

const updateUserAfterVerification = async ({ id, type, client }) => {
  const updateFields =
    type === "account"
      ? "activated = TRUE, activation_token = NULL, activation_expires = NULL"
      : "reset_password_token = NULL, reset_password_expires = NULL, reset_code = NULL";

  const query = `
    UPDATE users
    SET ${updateFields}
    WHERE id = $1
  `;

  const result = await client.query(query, [id]);
  return result.rowCount;
};

const updateUserPasswordById = async ({ id, password, client }) => {
  const query = `
    UPDATE users
    SET password = $1
    WHERE id = $2
  `;
  const result = await client.query(query, [password, id]);
  return result.rowCount;
};

const updateUserProfilePicture = async({id,buffer, client}) => {
  const query = `UPDATE users SET profile_picture = $1 WHERE id = $2`;
  const result = await client.query(query, [buffer, id]);
  return result.rowCount;
}

export const user = {
  insert_user: insertUser,
  update_user_activation_code: updateUserActivationCode,
  select_user_by_username: selectUserByUsername,
  select_user_by_email: selectUserByEmail,
  select_user_by_id: selectUserById,
  select_user_by_email_or_username: selectUserByEmailOrUsername,
  update_user_password_reset_code: updateUserPasswordResetCode,
  update_user_activation_token: updateUserActivationToken,
  update_user_password_token: updateUserPasswordToken,
  select_user_by_token: selectUserByToken,
  update_user_after_verification: updateUserAfterVerification,
  update_user_activation_code_by_email: updateUserActivationCodeByEmail,
  update_user_password_by_id: updateUserPasswordById,
  update_user_profile_picture: updateUserProfilePicture,
  select_profile_picture_by_id: selectProfilePictureById,
  update_user_username: updateUserUsername,
  update_user_email: updateUserEmail
};
