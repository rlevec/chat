const userIndexes = [
    "CREATE UNIQUE INDEX IF NOT EXISTS idx_users_id ON users(id);",
    "CREATE UNIQUE INDEX IF NOT EXISTS idx_users_email ON users(email);",
    "CREATE UNIQUE INDEX IF NOT EXISTS idx_users_username ON users(username);"
];


const messageIndexes = [
    "CREATE INDEX IF NOT EXISTS idx_messages_id ON messages(id);",
    "CREATE INDEX IF NOT EXISTS idx_messages_sender ON messages(sender_id);",
    "CREATE INDEX IF NOT EXISTS idx_messages_receiver ON messages(receiver_id);",
    "CREATE INDEX IF NOT EXISTS idx_messages_is_read ON messages(is_read);"
];

const contactIndexes = [
    "CREATE UNIQUE INDEX IF NOT EXISTS idx_contacts_user_contact ON contacts(user_id, contact_id);",
    "CREATE INDEX IF NOT EXISTS idx_contacts_user_id ON contacts(user_id);",
    "CREATE INDEX IF NOT EXISTS idx_contacts_contact_id ON contacts(contact_id);",
    "CREATE INDEX IF NOT EXISTS idx_contacts_status ON contacts(status);",
    "CREATE INDEX IF NOT EXISTS idx_contacts_blocked_by ON contacts(blocked_by);",
    "CREATE INDEX IF NOT EXISTS idx_contacts_user_status ON contacts(user_id, status);"
  ];


export const indexes = {
    user: userIndexes,
    message: messageIndexes,
    contact: contactIndexes,
};
