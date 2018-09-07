const router = require('express').Router();
const Goal = require('../models/Goal');
const { respond } = require('../util/respond');

module.exports = router

    .get('/', respond(
        () => Goal.getAllGoals()
    ));