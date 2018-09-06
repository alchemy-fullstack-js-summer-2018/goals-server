const router = require('express').Router();
const Goal = require('../models/Goal');
const { getParam, respond } = require('../util/respond');

module.exports = router

    .param('id', getParam)

    .post('/', respond(
        ({ body }) => Goal.create(body)
    ))

    .get('/:id', respond(
        ({ id }) => Goal.findById(id).lean()
    ));