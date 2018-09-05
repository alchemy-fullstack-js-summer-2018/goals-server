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
});