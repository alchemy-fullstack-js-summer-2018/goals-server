const request = require('../request');
const { assert } = require('chai');
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

  // beforeEach(() => {
  //   return request
  //     .post('/api/auth/signup')
  //     .send({
  //       name: 'Tony Robbins',
  //       email: 'robbins@rob.com',
  //       password: 'abc123',
  //     })
  //     .then(({ body }) => {
  //       user = body;
  //       token = body.token;
  //     });
  // });


  it('signs up a user', () => {
    assert.ok(tokenOne);
  });

  // it('signs in a user', () => {
  //   return request
  //     .post('/api/auth/signup')
  // })
});