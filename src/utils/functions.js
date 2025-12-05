const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

module.exports = {
    hash: async (plainTextPassword) => {
        return bcrypt.hashSync(plainTextPassword, 10);
    },

    compareHash: async (pass, hash) => {
        return bcrypt.compareSync(pass, hash);
    },

    jwtSign: async (payload) => {
        try {
            return jwt.sign(payload, process.env.JWT_SECRET || 'secret', { expiresIn: process.env.JWT_EXPIRY_TIME || '7d' });
        } catch (error) {
            throw error;
        }
    },

    jwtVerify: (token) => {
        return jwt.verify(token,  process.env.JWT_SECRET);
    },
}