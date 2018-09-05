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
                console.log(body);
                token = body.token;
            });
    });

    it('signup', () => {
        assert.ok(token);
    });

    it('logins a user', () => {
        
    });
});