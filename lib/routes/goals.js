const router = require('express').Router();
const Goal = require('../models/Goal');
const { getParam, respond } = require('../util/respond');

module.exports = router

    .param('id', getParam)

    .post('/', respond(
        ({ user, body }) => Goal.create({ user: user.id, ...body })
    ))

    .get('/user', respond(
        ({ user }) => Goal.getGoalsByUser(user.id)
    ))

    .get('/:id', respond(
        ({ id }) => Goal.findById(id).lean()
    ));

