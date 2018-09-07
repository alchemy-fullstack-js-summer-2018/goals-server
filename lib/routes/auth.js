const router = require('express').Router();
const { respond } = require('./route-helpers');
const User = require('../models/User');
const tokenService = require('../utils/token-service');
const createEnsureAuth = require('../utils/ensure-auth');

const hasEmailAndPassword = ({ body }, res, next) => {
    const { email, password } = body;
    if(!email || !password) {
        throw {
            code: 400,
            error: 'Email and password are required'
        };
    }
    next();
};

module.exports = router

    .get('/verify', createEnsureAuth(), respond (
        () => Promise.resolve({ verified: true })
    ))

    .post('/signup', hasEmailAndPassword, (req, res, next) => {
        const { name, email, password } = req.body;
        delete req.body.password;

        User.exists({ email })
            .then(exists => {
                if(exists) { throw { code: 400, error: 'email in use' }; }
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
    
    .post('/signin', hasEmailAndPassword, (req, res, next) => {
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