const router = require('express').Router();
const Goal = require('../models/goal');
const { getParam, respond } = require('../util/route-helpers');

module.exports = router
    .param('id', getParam)

    .post('/', respond(
        ({ body, user }) => {
            body.userId = user.id;
            return Goal.create(body);
        }
    ))

    .get('/', respond(
        ({ query }) => Goal.getByQuery(query)
    ))

    .put('/:id', respond(
        ({ body }) => {
            console.log('*** ROUTE BODY ***', body);
            return Goal.findByIdAndUpdate(body._id, body);
        }
    ));