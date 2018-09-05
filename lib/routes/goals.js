const router = require('express').Router();
const { respond, getParam } = require('./route-helpers');
const Goal = require('../models/Goal');

module.exports = router

    .get('/', respond(
        ({ user }) => Goal.findById(user.id)
    ))

    .post('/', respond(
        ({ user, body }) => Goal.create({ userId: user.id, ...body })
    ));