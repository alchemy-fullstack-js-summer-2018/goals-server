const { assert } = require('chai');
const request = require('./request');
const { dropCollection  } = require('./_db');
// const { verify } = require('../../lib/auth/token-service');

const checkOk = res => {
    assert.equal(res.status, 200, 'expected 200 http status code');
    return res;
};

describe('Goals API', () => {

    beforeEach(() => dropCollection('goals'));
    beforeEach(() => dropCollection('users'));

    let goal1 = {
        name: 'train for marathon',
        complete: false
    };

    let goal2 = {
        name: 'watch GOT',
        complete: false
    };

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

    beforeEach(() => {
        return request
            .post('/api/me/goals')
            .set('Authorization', token)
            .send(goal1)
            .then(checkOk)
            .then(({ body }) => {
                const { _id, __v } = body;
                assert.ok(_id);
                assert.equal(__v, 0);
                assert.deepEqual(body, {
                    _id, __v,
                    ...goal1
                });
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
                const { _id, __v } = body;
                assert.ok(_id);
                assert.equal(__v, 0);
                assert.deepEqual(body, {
                    _id, __v,
                    ...goal2
                });
                goal2 = body;
            });
    });
    

    it('saves a goal', () => {
        assert.isOk(goal1._id);
    });

    it.only('gets all goals', () => {
        return request
            .get('/api/me/goals')
            .set('Authorization', token)
            .then(checkOk)
            .then(({ body }) => {
                assert.deepEqual(body, [goal1, goal2]);
            });
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