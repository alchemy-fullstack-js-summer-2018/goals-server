const router = require('express').Router();
const Goal = require('../models/goal');
const { respond } = require('./route-helpers');

module.exports = router

    .post('/', respond(
        ({ user, body }) => Goal.create({ userId: user.id, ...body })
    ))

    .get('/', respond(
        ({ body }) => Goal.find(body)
    ));