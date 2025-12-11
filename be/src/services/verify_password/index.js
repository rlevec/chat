import bcrypt from "bcrypt"

import { utils } from "../../utils/index.js"

export const verifyPassword = async(params = {}) => {

    const {
        password = "",
        hashedPassword = ""
    } = params

    if (!password || typeof password !== 'string' || password.trim().length === 0) {
        utils?.throw_new_error(400, 'Password must be a non-empty string')
    }

    if (!hashedPassword || typeof hashedPassword !== 'string' || hashedPassword.trim().length === 0) {
        utils?.throw_new_error(400, 'Hashed password is required for verification')
    }

    if (!hashedPassword.startsWith('$2b$') && !hashedPassword.startsWith('$2a$') && !hashedPassword.startsWith('$2y$')) {
        utils?.throw_new_error(400, 'Invalid hash format')
    }

    try {
        const isMatch = await bcrypt.compare(password, hashedPassword)
        return isMatch
        
    } catch (error) {
        console.error('Password verification error:', error.message)
        
        if (error.message.includes('Illegal arguments')) {
            utils?.throw_new_error(400, 'Invalid password or hash format')
        } else {
            utils?.throw_new_error(500, 'Failed to verify password due to server error')
        }
    }
}