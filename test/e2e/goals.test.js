const { assert } = require('chai');
const request = require('./request');
const { dropCollection, createToken } = require('./db');

describe('Goals API', () => {

    beforeEach(() => dropCollection('users'));
    beforeEach(() => dropCollection('goals'));

    let token = '';
    beforeEach(() => createToken().then(t => token = t));

    const checkOk = res => {
        if(!res.ok) throw res.error;
        return res;
    };
    
    let goal = { goal: 'Finish this lab' };
    let anotherGoal = { goal: 'Get a job' };
    beforeEach(() => {
        return request.post('/api/me/goals')
            .set('Authorization', token)
            .send(goal)
            .then(checkOk)
            .then(({ body }) => {
                const { _id, __v } = body;
                assert.ok(_id);
                assert.equal(__v, 0);
                goal = body;
            });
    });

    beforeEach(() => {
        return request.post('/api/me/goals')
            .set('Authorization', token)
            .send(anotherGoal)
            .then(checkOk)
            .then(({ body }) => {
                const { _id, __v } = body;
                assert.ok(_id);
                assert.equal(__v, 0);
                anotherGoal = body;
            });
    });

    it('gets all goals by user', () => {
        return request.get('/api/me/goals')
            .set('Authorization', token)
            .then(({ body }) => assert.deepEqual(body, [goal, anotherGoal]));
    });

    it('updates a goal', () => {
        goal.goal = 'Finish the lab asap';
        return request.put(`/api/me/goals/${goal._id}`)
            .set('Authorization', token)
            .send(goal)
            .then(checkOk)
            .then(({ body }) => assert.equal(body.goal, goal.goal));
    });

});