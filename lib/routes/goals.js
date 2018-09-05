const router = require('express').Router();
const { getParam, respond } = require('./route-helpers');
const Goal = require('../models/goal');

module.exports = router

    .param('id', getParam)
    
    .post('/', respond(
        ({ body }) => Goal.create(body)
    ))
    
    .get('/', respond(
        ({ body }) => Goal.find(body)
    ))
    
    .put('/:id', respond(
        ({ id, body }) => Goal.updateById(id, body)
    ));