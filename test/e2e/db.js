const connect = require('../../lib/utils/connect');
const url = 'mongodb://localhost:27017/goals';
const mongoose = require('mongoose');
const request = require('./request');

before(() => connect(url) || 'mongodb://localhost:27017/goals');    
after(() => mongoose.connection.close());

module.exports = {
    dropCollection(name) {
        return mongoose.connection.dropCollection(name)
            .catch(err => {
                if(err.codeName !== 'NamespaceNotFound') throw err;
            });
    },

    createToken(data = { name: 'markalope', email: 'test@test.com', password: 'Abc123' }) {
        return request
            .post('/api/auth/signup')
            .send(data)
            .then(res => res.body.token);
    }
};