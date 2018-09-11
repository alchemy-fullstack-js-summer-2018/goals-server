const { assert } = require('chai');
const request = require('../request');
const { dropCollection } = require('../db');

const userOne = {
    name: 'Stef',
    email: 'stef@robyn.com',
    password: '12345678'
};

let tokenOne;

describe('Auth Api', () => {
    beforeEach(() => dropCollection('users'));

    beforeEach(() => {
        return request
            .post('/api/auth/signup')
            .send(userOne)
            .then(({ body }) => tokenOne = body.token);
    });

    it('signup', () => {
        assert.ok(tokenOne);
    });

    it('verifies', () => {
        return request
            .get('/api/auth/verify')
            .set('Authorization', tokenOne)
            .then(({ body }) => {
                assert.isOk(body.valid);
            });
    });

    it('signin', () => {
        return request
            .post('/api/auth/signin')
            .send(userOne)
            .then(({ body }) => {
                assert.ok(body.token);
            });
    });
});