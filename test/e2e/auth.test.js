const { assert } = require('chai');
const request = require('../request');
const { dropCollection } = require('../db');

const userOne = {
  name: 'Tony',
  email: 'tony@robbins.com',
  password: 'pelepele'
};

// const userTwo = {
//   NAME: 'Antreo',
//   email: 'antreo@antreo.com',
//   password: 'pelepele'
// };

// const badPassword = {
//   name: 'Antreo',
//   email: 'antreo@antreo.com',
//   password: 'pelepell',
// };

// const badEmail = {
//   name: 'Antreo',
//   email: 'antreq@antreo.com',
//   password: 'pelepele'
// };
let tokenOne;

describe('Auth API', () => {
  beforeEach(() => dropCollection('users'));

  beforeEach(() => {
    return request
      .post('/api/auth/signup')
      .send(userOne)
      .then(({ body }) => tokenOne = body.token);
  });

  it('signs up a user', () => {
    assert.ok(tokenOne);
  });

  it('verifies auth', () => {
    return request
      .get('/api/auth/verify')
      .set('Authorization', tokenOne)
      .then(({ body }) => {
        assert.isOk(body.valid);
      });
  });

  it('signin user', () => {
    return request
      .post('/api/auth/signin')
      .send(userOne)
      .then(({ body }) => {
        assert.ok(body.token);
      });
  });
});