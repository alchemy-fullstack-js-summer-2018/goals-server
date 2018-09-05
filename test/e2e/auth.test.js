const { assert } = require('chai');
const request = require('./request');
const { dropCollection } = require('./_db');

describe.only('Auth API', () => {

    beforeEach(() => dropCollection('users'));

    let token = null;

    beforeEach(() => {
        return request
            .post('/api/auth/signup')
            .send({
                email: 'test@test.com',
                password: 'abc'
            })
            .then(({ body }) => token = body.token);
    });
    
    it('signup', () => {
        assert.ok(token);
    });

    it('verifies', () => {
        return request
            .get('/api/auth/verify')
            .set('Authorization', token)
            .then(({ body }) => {
                console.log('body', body);
                assert.isOk(body.verified);
            });
    });

    it('signin', () => {
        return request
            .post('/api/auth/signin')
            .send({
                email: 'test@test.com',
                password: 'abc'
            })
            .then(({ body }) => {
                assert.ok(body.token);
            });
    });

    it.only('Gives 400 on signup of same email', () => {
        return request
            .post('/api/auth/signup')
            .send({
                email: 'test@test.com',
                password: 'abc'
            })
            .then(res => {
                assert.equal(res.status, 400);
                assert.equal(res.body.error, 'email in use');
            });
    });
});