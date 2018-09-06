const { assert } = require('chai');
const request = require('../request');
const { checkOk } = request;
const { dropCollection, createToken } = require('../db');

describe('Goals API', () => {
    beforeEach(() => dropCollection('users'));
    beforeEach(() => dropCollection('goals'));

    let token;
    let testGoal;

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
                console.log('8888888********', testGoal);
            });
    });

    it('saves a goal', () => {
        assert.equal(testGoal.goal, 'get good');
    });

    
});