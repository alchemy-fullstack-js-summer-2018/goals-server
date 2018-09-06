const router = require('express').Router();
const Goal = require('../models/Goal');
const { respond } = require('../util/respond');

module.exports = router

    .post('/', respond(
        ({ body }) => Goal.create(body)
    ))

    .get('/:id', respond(
        ({ id }) => Goal.findById(id).lean()
    ));