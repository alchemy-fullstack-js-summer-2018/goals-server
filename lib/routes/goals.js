const router = require('express').Router();
const Goal = require('../models/goal');
const User = require('../models/user');
const ensureAuth = require('../auth/ensure-auth')();

const updateOptions = {
  new: true,
  runValidators: true
};

module.exports = router

  .post('/', ensureAuth, (req, res, next) => {
    let goal = {};
    Goal.create(req.body)
      .then(g => {
        goal = g;
        User.findByIdAndUpdate(
          g.author,
          { $push: { goals: g } },
          updateOptions          
        )
          .then(() => {
            res.json(goal);
          });      
      })
      .catch(next);
  })

  .put('/:id', ensureAuth, (req, res, next) => {
    Goal.findByIdAndUpdate(
      req.params.id,
      req.body,
      updateOptions
    )
      .then(body => res.json(body))
      .catch(next);
  })

  .get('/', (req, res, next) => {
    Goal.find()
      .lean()
      .then(goals => res.json(goals))
      .catch(next);
  })

  .get('/:id', (req, res, next) => {
    Goal.findById(req.params.id)
      .lean()
      .then(goal => res.json(goal))
      .catch(next);
  });