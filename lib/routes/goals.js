const router = require('express').Router();
const Goal = require('../models/goal');
const ensureAuth = require('../auth/ensure-auth')();

module.exports = router
    .get('/', (req, res, next) => {
        Goal.find()
            .select('name').lean()
            .then(goals => res.json(goals))
            .catch(next);
    })

    .get('/:id', (req, res, next) => {
        Goal.findById(req.params.id)
            .lean()
            .then(goal => res.json(goal))
            .catch(next);
    })

    .post('/', ensureAuth, (req, res, next) => {
        Goal.create(req.body)
            .then(goal => res.json(goal))
            .catch(next);
    });
