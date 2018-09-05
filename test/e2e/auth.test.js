const { assert } = require('chai');
const request = require('./request');
const { dropCollection } = require('./db');

describe('auth API', () => {

    beforeEach(() => dropCollection('users'));

    let token;

    beforeEach(() => {
        return request
            .post('/api/auth/signup')
            .send({
                name: 'test',
                email: 'test@test.com',
                password: 'test123'
            })
            .then(({ body }) => {
                token = body.token;
            });
    });

    it('signup', () => {
        assert.ok(token);
    });

    it('verifies a user', () => {
        return request
            .get('/api/auth/verify')
            .set('Authorization', token)
            .then(({ body }) => {
                assert.isOk(body.verified);
            });
    });
});