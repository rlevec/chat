const userModel = `
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW(),
    activated BOOLEAN DEFAULT FALSE,
    activation_token VARCHAR(255) DEFAULT NULL,
    activation_expires TIMESTAMPTZ DEFAULT NULL,
    reset_password_token VARCHAR(255) DEFAULT NULL,
    reset_password_expires TIMESTAMPTZ DEFAULT NULL,
    reset_code VARCHAR(6) CHECK (length(reset_code) = 6) DEFAULT NULL,
    activation_code VARCHAR(6) CHECK (length(activation_code) = 6) DEFAULT NULL,
    profile_picture BYTEA CHECK (octet_length(profile_picture) <= 10485760) DEFAULT NULL
`;

const contactModel = `
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id) ON DELETE CASCADE,
    contact_id INT REFERENCES users(id) ON DELETE CASCADE,
    created_at TIMESTAMP DEFAULT NOW(),
    status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'accepted', 'blocked')),
    blocked_by INT REFERENCES users(id) DEFAULT NULL,
    UNIQUE(user_id, contact_id)
`;

const messageModel = `
    id SERIAL PRIMARY KEY,
    sender_id INT REFERENCES users(id) ON DELETE CASCADE,
    receiver_id INT REFERENCES users(id) ON DELETE CASCADE,
    content TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT NOW(),
    is_read BOOLEAN DEFAULT FALSE,
    is_edited BOOLEAN DEFAULT FALSE
`;


export const models = {
    user: userModel,
    contact: contactModel,
    message: messageModel
};
