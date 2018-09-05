const jwt = require('jsonwebtoken');
const APP_SECRET = process.env.APP_SECRET || 'mySecret';

module.exports = {
    sign(user) {
        const payload = {
            id: user._id,
            name: user.name,
            email: user.email
        };

        return jwt.sign(payload, APP_SECRET);
    },
    verify(token) {
        return jwt.verify(token, APP_SECRET);
    }
};