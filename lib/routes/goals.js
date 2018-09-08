const router = require('express').Router();
const Goal = require('../models/Goal');
const { respond, getParam } = require('./route-helpers');

const updateOptions = {
    new: true,
    runValidators: true
};

module.exports = router

    .param('id', getParam)
    
    .get('/', respond(
        ({ user }) => Goal.getUserById(user.id)
    ))

    .post('/:id', respond(
        ({ id }) => Goal.toggleCompleteById(id)
    ))

    .post('/', respond(
        ({ user, body }) => Goal.create({ userId: user.id, ...body })
    ))

    .put('/', respond(
        ({ body }) => {
            return Goal.findByIdAndUpdate(body._id, body, updateOptions);
        }
    ));