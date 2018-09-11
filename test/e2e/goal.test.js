const { assert } = require('chai');
const request = require('../request');
const { dropCollection } = require('../db');

describe('Goals API', () => {

  let user;
  let goal1;

  let token;

  beforeEach(() => dropCollection('goals'));
  beforeEach(() => dropCollection('users'));

  beforeEach(() => {
    return request
      .post('/api/auth/signup')
      .send({
        name: 'Tony',
        email: 'tony@robbins.com',
        password: 'pelepele',
        goals: []
      })
      .then(({ body }) => {
        token = body.token;
        user = body;
      });
  });

  it('saves a user', () => {
    assert.ok(user);
    assert.ok(token);
  });

  beforeEach(() => {
    return request
      .post('/api/goals')
      .set('Authorization', token)
      .send({
        goal: 'exercise',
        completed: false,
        author: user._id
      })
      .then(({ body }) => {
        goal1 = body;
        assert.deepEqual(body, {
          ...goal1,
          // _id, __v
        });
      });
  });

  it('saves a goal', () => {
    assert.ok(goal1);
  });

  it('gets goals', () => {
    return request  
      .get('/api/goals')
      .then(({ body }) => {
        assert.deepEqual(body.length, 1);
      });
  });

  it('gets a goal by id', () => {
    return request
      .get(`/api/goals/${goal1._id}`)
      .then(({ body }) => {
        assert.deepEqual(body, goal1);
      });
  });

  it('updates a goal', () => {
    goal1.completed = true;
    return request
      .put(`/api/goals/${goal1._id}`)
      .set('Authorization', token)
      .send(goal1)
      .then(({ body }) => {
        assert.equal(body.completed, true);
      });
  });

});