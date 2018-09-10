const router = require('express').Router();
const User = require('../models/user');
const Goal = require('../models/goal');

module.exports = router

    .get('/:id', (req, res, next) => {
        User.findById(req.params.id)
            .lean()
            .catch(next);
    })

    .get('/:id/goals', (req, res, next) => {
        Goal.find({ user: req.params.id })
            .lean()
            .select('-__v')
            .catch(next);
    });