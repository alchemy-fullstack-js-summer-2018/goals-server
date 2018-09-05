const request = require('./request');
const mongoose = require('mongoose');
const assert = require('chai').assert;

// const tokenService = require('../auth/token-service');

const makeSimpleByID = (goal, user) => {
  const simple = {
    _id: goal._id,
    subject: goal.subject,
    goalList: goal.goalList
  };

  if(user) {
    simple.user = {
      _id: user.id,
      name: 'Pele'
    };
  }
  return simple;
};

let goalOne;
let goalTwo;
// eslint-disable-next-line
let tokenOne;
let userOne;
let tokenTwo;
// eslint-disable-next-line
let userTwo;

const 

describe('Goals API', () => {
  
  beforeEach(() => mongoose.connection.dropDatabase());

  it('saves a goal', () => {
    assert.isOk(goal._id);
  });
});