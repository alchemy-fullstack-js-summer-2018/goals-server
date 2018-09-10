const router = require('express').Router();
const User = require('../models/User');
const { respond } = require('./route-helpers');

module.exports = router

    .get('/', respond(
        ({ user }) => User.getUserById(user.id)
    ));