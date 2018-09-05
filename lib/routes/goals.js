const router = require('express').Router();
const { getParam, respond } = require('./route-helpers');
const Goals = require('../models/goal');

module.exports = router

    .param('id', getParam)
    
    .post('/', respond(
        ({ body }) => Goals.create(body)
    ))
    
    .get('/', respond(
        ({ body }) => Goals.find(body)
    ));