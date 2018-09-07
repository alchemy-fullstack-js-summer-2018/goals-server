const router = require('express').Router();
const { respond, getParam } = require('./route-helpers');
const Goal = require('../models/Goal');

module.exports = router
    .param('id', getParam)

    .get('/', respond(
        ({ user }) => Goal.getByUserId(user.id)
    ))

    .post('/:id', respond(
        ({ id }) => Goal.toggleCompleteById(id)
    ))

    .post('/', respond(
        ({ user, body }) => Goal.create({ userId: user.id, ...body })
    ));

