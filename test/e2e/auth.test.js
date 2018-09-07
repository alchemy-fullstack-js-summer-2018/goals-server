const { assert } = require('chai');
const request = require('./request');
const { dropCollection } = require('./db');

describe('Auth API', () => {
    beforeEach(() => dropCollection('users'));
    
    
    let token, user;
    beforeEach(() => {
        return request
            .post('/api/auth/signup')
            .send({
                name: 'mister',
                email: 'blah@blah.com',
                password: 'abc123'
            })
            .then(({ body }) => {
                user = body;
                token = body.token;
            });
    });

    it('signs up a user', () => {
        assert.equal(user.name, 'mister');
        assert.isOk(token);
    });

    it('signs in a user', () => {
        return request
            .post('/api/auth/signin')
            .send({
                email: 'blah@blah.com',
                password: 'abc123'
            })
            .then(({ body }) => {
                assert.equal(body.name, 'mister');
                assert.isOk(body.token);
            });
    });

    it('Gives 400 on signup of same email', () => {
        return request
            .post('/api/auth/signup')
            .send({
                name: 'asdf',
                email: 'blah@blah.com',
                password: 'abc123'
            })
            .then(res => {
                assert.equal(res.status, 400);
                assert.equal(res.body.error, 'Email exists');
            });
    });

    it('Gives 401 on non-existent email', () => {
        return request
            .post('/api/auth/signin')
            .send({
                email: 'bad@me.com',
                password: 'abc'
            })
            .then(res => {
                assert.equal(res.status, 401);
                assert.equal(res.body.error, 'Invalid email or password');
            });
    });

});