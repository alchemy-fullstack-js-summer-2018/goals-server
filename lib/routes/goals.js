const router = require('express').Router();
const Goal = require('../models/goal');
const { getParam, respond } = require('../util/route-helpers');

module.exports = router
    .param('id', getParam)

    .post('/', respond(
        ({ body }) => Goal.create(body)
    ))

    .get('/', respond(
        ({ query }) => Goal.getByQuery(query)
    ));