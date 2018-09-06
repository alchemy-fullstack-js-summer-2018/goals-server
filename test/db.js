
const connect = require('../lib/connect');
// const url = 'mongodb://localhost:27017/goals';
const mongoose = require('mongoose');
const request = require('./request');

before(() => connect('mongodb://localhost:27017/goals'));
after(() => mongoose.connection.close());

module.exports = {
  dropCollection(name) {
    return mongoose.connection.dropCollection(name)
      .catch(err => {
        if(err.codeName !== 'NamespaceNotFound') throw err;
      });
  },

  createToken(data = { name: 'Tony Robins', email: 'robbins@rob.com', password: 'abc123' }) {
    return request
      .post('/api/signup')
      .send(data)
      .then(res => res.body.token);
  }
};