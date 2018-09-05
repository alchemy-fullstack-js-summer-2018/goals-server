const router = require('express').Router();
const Goal = require('../models/goal');
const User = require('../models/user');
const ensureAuth = require('../auth/ensure-auth')();
const respond = require('../utils/route-helpers');
const updateOptions = {
    new: true,
    runValidators: true
};


module.exports = router 

    .post('/', ensureAuth, (req, res, next) => {
        Goal.create(req.body)
            .then(goal => {
                User.findByIdAndUpdate(
                    goal.author,
                    {$push: { goals: goal } },
                    updateOptions
                )
                    .then(body => res.json(body));
            })
            .catch(next);
    })

    .put('/', ensureAuth, (req, res, next) => {
        Goal.findByIdAndUpdate(
            req.user.id,
            req.body,
            updateOptions
        )
            .then(body => res.json(body))
            .catch(next);
    })

    .get('/', (req, res, next) => {
        Goal.find()
            .lean()
            .then(goals => res.json(goals))
            .catch(next);
    })

    .get('/', (req, res, next) => {
        Goal.findById(req.user.id)
            .lean()
            .then(goal => res.json(goal))
            .catch(next);
    });


    // .post('/', ensureAuth, (req, res, next) => {
    //     Goal.create(req.body)
    //         .then(goal => {
    //             User.findByIdAndUpdate(
    //                 goal.author,
    //                 {$push: { goals: goal } },
    //                 updateOptions
    //             )
    //                 .then(body => res.json(body));
    //         })
    //         .catch(next);
    // })