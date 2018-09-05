const { assert } = require('chai');
const { dropCollection } = require('./db');
const request = require('./request');

const checkOk = res => {
    assert.equal(res.status, 200, 'expected 200 http status code');
    return res;
};

const user = {
    name: 'todd motto',
    email: 'me@motto.com',
    password: 'abc'
};

const goal = {
    goal: 'finish this lab'
};

describe('Goals API', () => {
    let token;

    beforeEach(() => dropCollection('users'));
    beforeEach(() => dropCollection('goals'));

    beforeEach(() => {
        return request
            .post('/api/auth/signup')
            .send(user)
            .then(checkOk)
            .then(({ body }) => {
                token = body.token;
                assert.isOk(token);
            });
    });

    beforeEach(() => {
        return request
            .get('/api/auth/verify')
            .set('Authorization', token)
            .then(({ body }) => {
                assert.isOk(body.valid);
            });
    });

    it('posts a goal by the signed-in user', () => {
        return request
            .post('/api/me/goals')
            .set('Authorization', token)
            .send(goal)
            .then(({ body }) => {
                assert.isOk(body.goal);
            });
    });

    it('allows the user to update a goal', () => {
        return request
            .put('/api/me/goals')
            .set('Authorization', token)
            .send({ completed: true })
            .then(({ body }) => {
                assert.equal(body.completed, true);
            });
    });
});