const { request, save } = require('./request');
const mongoose = require('mongoose');
const assert = require('chai').assert;

const { dropCollection } = require('./db');
const tokenService = require('../../lib/auth/token-service');

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

let exercise;
let photography;
let userOne;
let tokenOne;
let userTwo;
let tokenTwo;

const tonyRobbins = {
  name: 'Tony Robbins',
  email: 'robbins@rob.com',
  password: 'abc123'
};

const wayneDyer = {
  name: 'Wayne Dyer',
  email: 'wayne@dyer.com',
  password: 'def456'
};



describe.skip('Goals API', () => {
  
  beforeEach(() => mongoose.connection.dropDatabase());

  beforeEach(() => dropCollection('goals'));
  beforeEach(() => dropCollection('users'));

  beforeEach(() => {
    return request
      .post('/api/auth/signup')
      .send(tonyRobbins)
      .then(({ body }) => {
        tokenOne = body.token;
        tokenService.verify(tokenOne)
          .then(userBody => userOne = userBody);
      });
  });

  beforeEach(() => {
    return request
      .post('/api/auth/signup')
      .send(wayneDyer)
      .then(({ body }) => {
        tokenTwo = body.token;
        tokenService.verify(tokenTwo)
          .then(userBody => userTwo = userBody);
      });
  });

  beforeEach(() => {
    return save('goals', {
      subject: 'exercise',
      goalList: ['run', 'swimming']
    }, tokenOne)
      .then(data => exercise  = data);
  });
  
  beforeEach(() => {
    return save('goals', {
      subject: 'photography',
      goalList: ['camera', 'film']
    }, tokenOne)
      .then(data => photography  = data);
  });


  it('saves a goal', () => {
    assert.isOk(exercise._id);
  });

});