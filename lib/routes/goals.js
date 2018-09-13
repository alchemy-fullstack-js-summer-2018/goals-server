const router = require('express').Router();
const Goal = require('../models/goal');
const { respond, getParam } = require('../utils/route-helpers');

router 

  .param('id', getParam)

  .post('/', respond(
    ({ user, body }) => Goal.create({ author: user.id, ...body })
  ))

  .post('/:id', respond(
    ({ id }) => Goal.changeCompletedStatusById(id)
  ))

  .get('/', respond(
    ({ user }) => Goal.getByUserId(user.id)
  ));

module.exports = router;