const connect = require('../lib/connect');
const url = 'mongodb://localhost:27017/goals-test';
const mongoose = require('mongoose');
const request = require('./request');

before(() => connect(url));    
after(() => mongoose.connection.close());

module.exports = {
    
    dropCollection(name) {
        return mongoose.connection.dropCollection(name)
            .catch(err => {
                if(err.codeName !== 'NamespaceNotFound') throw err;
            });
    },

    createToken(data = { email: 'me@me.com', password: 'abc' }) {
        return request
            .post('/api/auth/signup')
            .send(data)
            .then(res => res.body.token);
    }
};