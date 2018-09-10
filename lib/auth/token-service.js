const jwt = require('jsonwebtoken-promisified');
const appSecret = process.env.APP_SECRET || 'secrets';

module.exports = {
    sign(user) {
        const payload = {
            id: user._id,
            roles: user.roles
        };
        console.log(payload.id);
        return jwt.signAsync(payload, appSecret);
    },
    verify(token) {
        return jwt.verifyAsync(token, appSecret);
    }
};