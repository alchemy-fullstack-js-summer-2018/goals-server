const connect = require('../../lib/util/connect');
const mongoose = require('mongoose');
const request = require('./request');

before(() => connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/goals-test'));    
after(() => mongoose.connection.close());

module.exports = {
    
    dropCollection(name) {
        return mongoose.connection.dropCollection(name)
            .catch(err => {
                if(err.codeName !== 'NamespaceNotFound') throw err;
            });
    },

    createToken(data = { 
        name: 'test',
        email: 'test@test.com', 
        password: 'test123' 
    }) {
        return request
            .post('/api/auth/signup')
            .send(data)
            .then(res => res.body.token);
    }
};