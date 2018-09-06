const router = require('express').Router();
const Goal = require('../models/Goal');
const { respond, getParam } = require('../utils/route-helpers');

router 

    .param('id', getParam)

    .post('/', respond(
        ({ user, body }) => Goal.create({ author: user.id, ...body })
    ));

module.exports = router;