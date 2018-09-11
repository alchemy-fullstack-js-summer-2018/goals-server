const router = require('express').Router();
const User = require('../models/User');
const { respond } = require('../utils/respond');

module.exports = router
    .get('/', respond(
        () => User.getByUserId()));