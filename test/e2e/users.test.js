const { assert } = require('chai');
const request = require('../request');
const { dropCollection } = require('./db');
// const { Types } = require('mongoose');

describe('users API', () => {

    beforeEach(() => dropCollection('users'));
    
    let token;

    const testUserData = {
        name: 'Injoong',
        email: 'me@me.com',
        password: 'abc123'
    };

    beforeEach(() => {
        return request
            .post('/api/auth/signup')
            .send(testUserData)
            .then(({body}) => {
                assert.isOk(body);
                token = body.token;
            });
    });

    it('posts users', () => {
        assert.isOk(token);
    });

    it('signs in users', () => {
        return request
            .post('/api/auth/signin')
            .send({
                email: 'me@me.com',
                password: 'abc123'
            })
            .then(({body}) => {
                assert.isOk(body);
                assert.equal(body.token, token);
            });
    });
});