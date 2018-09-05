const router = require('express').Router();
const { respond } = require('./route-helpers');
const Goal = require('../models/goal');

module.exports = router

    
    .post('/', respond(
        ({ user, body }) => Goal.create({ userId: user.id, ...body })
    ))
    
    .get('/', respond(
        ({ user }) => Goal.find(user.id)
    ));
    
// .put('/:id', respond(
//     ({ id, body }) => Goal.updateById(id, body)
// ));