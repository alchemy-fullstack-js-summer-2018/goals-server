const { assert } = require('chai');
const request = require('./request');
const { dropCollection } = require('./db');

describe('Auth API', () => {
    beforeEach(() => dropCollection('users'));

    let token;

    beforeEach(() => {
        return request
            .post('/api/auth/signup')
            .send({
                name: 'burke holland',
                email: 'me@me.com',
                password: 'abc'
            })
            .then(({ body }) => {
                token = body.token;
            });
    });

    it('will signup a user', () => {
        assert.ok(token);
    });

    it('verifies', () => {
        return request
            .get('/api/auth/verify')
            .set('Authorization', token)
            .then(({ body }) => {
                assert.isOk(body.valid);
            });
    });

    it('signs in', () => {
        return request
            .post('/api/auth/signin')
            .send({
                email: 'me@me.com',
                password: 'abc'
            })
            .then(({ body }) => {
                assert.equal(body.name, 'burke holland');
                assert.ok(body.token);

            });
    });
});