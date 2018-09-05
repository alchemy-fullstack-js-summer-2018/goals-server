const router = require('express').Router();
const { respond, getParam } = require('./route-helpers');
const Goal = require('../models/Goal');

module.exports = router
    .param('id', getParam)

    .get('/', respond(
        () => Goal.getUsersGoals()
    ));

