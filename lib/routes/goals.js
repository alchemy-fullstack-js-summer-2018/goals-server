const router = require('express').Router();
const Goals = require('../models/goals');

module.exports = router
    .get('/', (req, res, next) => {
        Goals.find()
            .select('name').lean()
            .then(goals => res.json(goals))
            .catch(next);
    })
    .get('/:id', (req, res, next) => {
        Goals.findById(req.params.id)
            .lean()
            .then(goal => res.json(goal))
            .catch(next);
    });