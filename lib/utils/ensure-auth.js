const tokenService = require('./token-service');

module.exports = function() {
    return (req, res, next) => {
        // read HTTP authorization header
        const token = req.get('Authorization');
        try {
            // if no token, return 400
            if(!token) return next({ status: 400, error: 'No token' });

            // verify token is valid (and get associated payload)
            const payload = tokenService.verify(token);

            // assign payload to "req.usser" so routes can know who the user is
            req.user = payload;

            // keep going...
            next();
        }
        catch(err) {
            next({
                status: 401,
                error: 'Invalid token'
            });
        }
    };
};