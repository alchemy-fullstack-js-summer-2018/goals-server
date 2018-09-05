const { assert } = require('chai');
const request = require('../request');
const { dropCollection } = require('../db');

describe.skip('Users API', () => {

    let user;
    let token;

    beforeEach(() => dropCollection('goals'));
    beforeEach(() => dropCollection('users'));

    beforeEach(() => {
        return request
            .post('/api/auth/signup')
            .send({
                name: 'Stef',
                email: 'stef@robyn.com',
                password: '12345678',
                goals: []
            })
            .then(({ body }) => {
                token = body.token;
                user = body;
            });
    });

    beforeEach(() => {
        return request
            .post('/api/me/goals')
            .set('Authorization', token)
            .send({
                goal: 'Travel',
                completed: false,
                author: user._id
            })
            .then(({ body }) => {
                assert.ok(body._id);
                goal1 = body;
            });
    });

    beforeEach(() => {
        return request
            .post('/api/me/goals')
            .set('Authorization', token)
            .send({
                goal: 'Let it be',
                completed: false,
                author: user._id
            })
            .then(({ body }) => {
                assert.ok(body._id);
                goal1 = body;
            });
    });

    it('gets all users with their goals', () => {
        return request
            .get('/api/users')
            .then(({ body }) => {
                console.log('users***', body);
                assert.equal(body.length, 1);
                assert.equal(body[0].name, 'Stef');
                assert.equal(body[0].goals.length, 2);
            });
    });
});