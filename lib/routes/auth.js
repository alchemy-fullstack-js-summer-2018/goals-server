const router = require('express').Router();
const { respond } = require('../util/respond');
const { sign } = require('../util/token-service');
const ensureAuth = require('../util/ensure-auth');
const User = require('../models/User');

const hasEmailAndPassword = ({ body }, res, next) => {
    const { email, password } = body;
    if(!email || !password) {
        throw {
            status: 400,
            error: 'Email and password are required'
        };
    }
    next();
};

module.exports = router
    .get('/verify', ensureAuth, respond(
        () => Promise.resolve({ verified: true })
    ))

    .post('/signup', hasEmailAndPassword, respond(
        ({ body }) => {
            const { name, email, password } = body;
            delete body.password;

            return User.exists({ email })
                .then(exists => {
                    if(exists) {
                        throw {
                            status: 400,
                            error: 'Email exists'
                        };
                    }
                    const user = new User(body);
                    user.generateHash(password);
                    return user.save();
                })
                .then((user) => Promise.all([user, sign(user)]))
                .then(user => {
                    return { 
                        token: sign(user),
                        name: name
                    };
                });
        }
    ))

    .post('/signin', hasEmailAndPassword, respond(
        ({ body }) => {
            const { email, password } = body;
            delete body.password;

            return User.findOne({ email })
                .then(user => {
                    if(!user || !user.comparePassword(password)) {
                        throw {
                            status: 401,
                            error: 'Invalid email or password'
                        };
                    }

                    return { 
                        token: sign(user),
                        name: user.name
                    };
                });
        }
    ));