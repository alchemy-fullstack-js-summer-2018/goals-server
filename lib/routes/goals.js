const router = require('express').Router();
const { respond } = require('./route-helpers');
const Goal = require('../models/goal');

const updateOptions = {
    new: true,
    runValidators: true
};

module.exports = router
    
    .post('/', respond(
        ({ user, body }) => Goal.create({ userId: user.id, ...body })
    ))
    
    .get('/', respond(
        ({ user }) => Goal.getByUserId(user.id)
    ))
    
    .put('/:id', respond(
        ({ body }) => Goal.findByIdAndUpdate(body._id, body, updateOptions)
    ));