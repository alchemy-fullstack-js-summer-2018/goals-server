const router = require('express').Router();
const Goal = require('../models/Goal');
const { respond, getParam } = require('../utils/route-helpers');


router

    .param('id', getParam)

    .get('/', respond(
        () => Goal.getUsersGoals()
    ));

module.exports = router;