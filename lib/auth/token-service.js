const jwt = require('jsonwebtoken');
const appSecret = process.env.APP_SECRET || 'change-me';

module.exports = {
    sign(user) {
        const payload = {
            id: user._id,
            roles: user.roles
        };
        return jwt.sign(payload, appSecret);
    },
    verify(token) {
        return jwt.verify(token, appSecret);
    }
};