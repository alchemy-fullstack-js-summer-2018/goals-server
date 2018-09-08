const request = require('../request');
const { assert } = require('chai');
const { dropCollection } = require('../db');

describe('Auth API', () => {
  beforeEach(() => dropCollection('users'));

  let token;
  let user;

  beforeEach(() => {
    return request
      .post('/api/auth/signup')
      .send({
        name: 'Tony Robbins',
        email: 'robbins@rob.com',
        password: 'abc123',
      })
      .then(({ body }) => {
        user = body;
        token = body.token;
      });
  });

  it('signs up a user', () => {
    assert.equal(user.name, 'Tony Robbins');
    assert.isOk(token);

  });

  // it('signs in a user', () => {
  //   return request
  //     .post('/api/auth/signup')
  // })
});