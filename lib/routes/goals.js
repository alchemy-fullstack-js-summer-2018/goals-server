const router = require('express').Router();
const Goal = require('../models/Goal');
const { getParam, respond } = require('../util/respond');

module.exports = router

    .param('id', getParam)

    .post('/', respond(
        ({ user, body }) => Goal.create({ user: user.id, ...body })
    ))

    .get('/', respond(
        ({ user }) => Goal.getGoalsByUser(user.id)
    ))

    .put('/:id', respond(
        ({ id, body }) => Goal.updateById(id, body)
    ));
