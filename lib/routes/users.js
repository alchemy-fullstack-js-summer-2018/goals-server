const router = require('express').Router();
const User = require('../models/user');

module.exports = router

    .get('/', (req, res, next) => {
        User.find()
            .lean()
            .limit(25) 
            .populate('goals')
            .then(users => res.json(users))
            .catch(next);
    });


// .get('/', respond(() => User.find()
//     .lean()
//     .limit(25) 
//     .populate('goals')      
// ));