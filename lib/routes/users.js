const router = require('express').Router();
const User = require('../models/user');

module.exports = router
    .get('/', (req, res, next) => {
        User.find()
            .select('name').lean()
            .then(user => res.json(user))
            .catch(next);
    })
    .get('/:id', (req, res, next) => {
        User.findById(req.params.id)
            .lean()
            .then(user => res.json(user))
            .catch(next);
    });