const tokenService = require('./token-service');

module.exports = function() {
    return (req, res, next) => {
        // read HTTP authorization header
        const token = req.get('Authorization');
        console.log('TOKEN AT ENSURE AUTH', token);
        try {
            // if no token, return 400
            if(!token) return next({ code: 400, error: 'No token' });

            // verify token is valid (and get associated payload)
            const payload = tokenService.verify(token);

            // assign payload to "req.user" so routes can know who the user is
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