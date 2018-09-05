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
    let token, postedGoal;

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
            .post('/api/me/goals')
            .set('Authorization', token)
            .send(goal)
            .then(({ body }) => {
                postedGoal = body;
                assert.isOk(body.goal);
            });
    });

    it('posts a goal properly', () => {
        assert.isOk(postedGoal);
    });

    it('allows the user to update a goal', () => {
        postedGoal.completed = true;
        return request
            .put('/api/me/goals')
            .set('Authorization', token)
            .send(postedGoal)
            .then(({ body }) => {
                assert.equal(body.completed, true);
            });
    });
});