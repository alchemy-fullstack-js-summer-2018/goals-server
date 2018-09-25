const router = require('express').Router();
const Goal = require('../models/Goal');
const { respond } = require('../utils/respond');

module.exports = router
    .get('/', respond(
        ({ user }) => Goal.getByUserId(user.id)
    ))
    .post('/', respond(
        ({ body, user }) => {
            body.userId = user.id;
            return Goal.create(body);
        }
    ))
    .put('/', respond(
        ({ body }) => {
            return Goal.findByIdAndUpdate(body._id, body, {new: true});
        }
    ));