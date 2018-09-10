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
                name: 'Joe Schmoe',
                email: 'joe@schmoe.com',
                password: 'abc'
            })
            .then(({ body }) => {
                token = body.token;
            });
    });

    it('Signs up a user', () => {
        assert.ok(token);
    });

    it('Verifies user', () => {
        return request
            .get('/api/auth/verify')
            .set('Authorization', token)
            .then(({ body }) => {
                assert.isOk(body.valid);
            });
    });

    it('Signs a user in', () => {
        return request
            .post('/api/auth/signin')
            .send({
                email: 'joe@schmoe.com',
                password: 'abc'
            })
            .then(({ body }) => {
                assert.equal(body.name, 'Joe Schmoe');
                assert.ok(body.token);
            });
    });
});