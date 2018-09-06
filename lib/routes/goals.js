const router = require('express').Router();
const Goal = require('../models/Goal');
const { respond, getParam } = require('./route-helpers');

const updateOptions = {
    new: true,
    runValidators: true
};

module.exports = router

    .param('id', getParam)

    .post('/', respond(
        ({ user, body }) => Goal.create({ userId: user.id, ...body })
    ))

    .get('/', respond(
        ({ user }) => Goal.getUserById(user.id)
    ))

    .put('/', respond(
        ({ body }) => {
            return Goal.findByIdAndUpdate(body._id, body, updateOptions);
        }
    ));