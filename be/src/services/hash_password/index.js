import bcrypt from "bcrypt"

import { utils } from "../../utils/index.js"

export const hashPassword = async(params = {}) => {
    const {
        password = "",
        saltRounds = 12
    } = params

    if (!password || typeof password !== 'string') {
        utils?.throw_new_error(400, 'Password must be a non-empty string')
    }

    if (saltRounds < 10 || saltRounds > 15) {
        utils?.throw_new_error(400, 'Salt rounds should be between 10 and 15 for security')
    }

    try {
        const hashedPassword = await bcrypt.hash(password, saltRounds)
        return hashedPassword
        
    } catch (error) {
        console.error('Password hashing error:', error.message)
        
        if (error.message.includes('Illegal arguments')) {
            utils?.throw_new_error(400, 'Invalid password hashing parameters')
        }
        utils?.throw_new_error(500, 'Failed to hash password due to server error')
    }
}