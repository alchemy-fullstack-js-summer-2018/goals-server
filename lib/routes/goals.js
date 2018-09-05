const router = require('express').Router();
const Goal = require('../models/goal');
const { respond } = require('./route-helpers');

module.exports = router

    .post('/', respond(
        ({ body }) => Goal.create(body)
    ));