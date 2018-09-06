const { assert } = require('chai');
const request = require('../request');
const { checkOk } = request;
const { dropCollection, createToken } = require('../db');

describe('Goals API', () => {
    beforeEach(() => dropCollection('users'));
    beforeEach(() => dropCollection('goals'));

    let token;
    let testGoal;
    let testGoal2;

    beforeEach(() => {
        return createToken()
            .then(t => token = t);
    });

    beforeEach(() => {
        return request
            .post('/api/me/goals')
            .set('Authorization', token)
            .send({ goal: 'get good' })
            .then(checkOk)
            .then(({ body }) => {
                testGoal = body;
            });
    });
    beforeEach(() => {
        return request
            .post('/api/me/goals')
            .set('Authorization', token)
            .send({ goal: 'get it' })
            .then(checkOk)
            .then(({ body }) => {
                testGoal2 = body;
            });
    });

    it('saves a goal', () => {
        assert.equal(testGoal.goal, 'get good');
    });

    it('gets a goal', () => {
        return request
            .get('/api/me/goals')
            .set('Authorization', token)
            .then(checkOk)
            .then(({ body }) => {
                assert.deepEqual(body, [testGoal, testGoal2]);
            });
    });

    // it('updates a goal', () => {
    //     return request
    //         .put(`api/me/goals/${testGoal._id}`)
    //         .set('Authorization', token)
    //         .then(checkOk)
    // })
});