const router = require('express').Router();
const { respond } = require('./route-helpers');
const User = require('../models/user');
const createEnsureAuth = require('../auth/ensure-auth');
const tokenService = require('../auth/token-service');

function hasEmailandPassword(req, res, next) {
    const user = req.body;
    if(!user || !user.email || !user.password) {
        return next({
            code: 400,
            error: 'email and password must be supplied'
        });
    }
    next();
}

module.exports = router

    .get('/verify', createEnsureAuth(), respond(
        () => Promise.resolve({ verified: true })
    ))

    .post('/signup', hasEmailandPassword, (req, res, next) => {
        const { name, email, password } = req.body;
        delete req.body.password;

        User.exists({ email })
            .then(exists => {
                if(exists) { throw { code: 400, error: 'email in use' }};
                const user = new User({ name, email });
                user.generateHash(password);
                return user.save();
            })
            .then(user => Promise.all([user, tokenService.sign(user)]))
            .then(([user, token]) => res.send({
                token,
                name: user.name
            }))
            .catch(next);
    })
    
    .post('/signin', hasEmailandPassword, (req, res, next) => {
        const { email, password } = req.body;
        delete req.body.password;

        User.findOne({ email })
            .then(user => {
                if(!user || !user.comparePassword(password)) {
                    throw { code: 401, error: 'Invalid Login' };
                }
                return user;
            })
            .then(user => Promise.all([user, tokenService.sign(user)]))
            .then(([user, token]) => res.send({
                token,
                name: user.name
            }))
            .catch(next);
    });

