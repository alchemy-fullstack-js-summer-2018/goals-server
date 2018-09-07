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
                name: 'mark-o-lope',
                email: 'test@test.com',
                password: 'Abc123'
            })
            .then(({ body }) => {
                user = body;
                token = body.token;
            });
    });

    it('signs up a user', () => {
        assert.equal(user.name, 'mark-o-lope');
        assert.isOk(token);
    });

    it('signs in a user', () => {
        return request
            .post('/api/auth/signin')
            .send({
                email: 'test@test.com',
                password: 'Abc123'
            })
            .then(({ body }) => {
                assert.equal(body.name, 'mark-o-lope');
                assert.isOk(body.token);
            });
    });

});