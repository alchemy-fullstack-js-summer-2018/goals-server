const { assert } = require('chai');
const request = require('./request');
const { dropCollection  } = require('./_db');

const checkOk = res => {
    assert.equal(res.status, 200, 'expected 200 http status code');
    return res;
};

describe.only('Goals API', () => {

    beforeEach(() => dropCollection('users'));
    beforeEach(() => dropCollection('goals'));

    let token = null;

    let user = {
        name: 'mariah',
        email: 'test@test.com',
        password: 'abc'
    };

    let goal1 = {
        name: 'train for marathon',
        complete: false
    };

    let goal2 = {
        name: 'watch GOT',
        complete: false
    };

    beforeEach(() => {
        return request
            .post('/api/auth/signup')
            .send(user)
            .then(({ body }) => token = body.token);
    });

    beforeEach(() => {
        return request
            .post('/api/me/goals')
            .set('Authorization', token)
            .send(goal1)
            .then(checkOk)
            .then(({ body }) => {
                goal1 = body;
            });
    });

    beforeEach(() => {
        return request
            .post('/api/me/goals')
            .set('Authorization', token)
            .send(goal2)
            .then(checkOk)
            .then(({ body }) => {
                goal2 = body;
            });
    });
    

    it('gets all goals', () => {
        return request
            .get('/api/me/goals')
            .set('Authorization', token)
            .then(checkOk)
            .then(({ body }) => {
                assert.deepEqual(body, [goal1, goal2]);
            });
    });

    it('saves a goal', () => {
        assert.isOk(goal1._id);
        assert.isOk(goal2._id);
    });

    it('updates a goal', () => {
        goal1.complete = true;
        return request
            .put(`/api/me/goals/${goal1._id}`)
            .set('Authorization', token)
            .send(goal1)
            .then(checkOk)
            .then(({ body }) => {
                assert.equal(body.complete, goal1.complete);
            });
    });
});