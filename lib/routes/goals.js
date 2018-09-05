const router = require('express').Router();
const Goals = require('../models/goals');

module.exports = router
    .get('/', (req, res, next) => {
        Goals.find()
            .select;
    });