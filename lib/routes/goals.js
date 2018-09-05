const router = require('express').Router();
const Goal = require('../models/goal');

module.exports = router
  .get('/', (req, res, next) => {
    Goal.find()
      .select('name').lean()
      .then(goals => res.json(goals))
      .catch(next);
  })
  .get('/', (req, res, next) => {
    Goal.findById(req.params.id)
      .lean()
      .then(goal => res.json(goal))
      .catch(next);
  });