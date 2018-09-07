const { assert } = require('chai');
const request = require('./request');
const { dropCollection, createToken } = require('./db');

describe.only('Users API', () => {

    const checkOk = res => {
        if(!res.ok) throw res.error;
        return res;
    };

    beforeEach(() => dropCollection('users'));
    beforeEach(() => dropCollection('goals'));

    let token = '';
    beforeEach(() => createToken().then(t => token = t));

    function saveGoal(data) {
        return request.post('/api/me/goals')
            .set('Authorization', token)
            .send(data)
            .then(checkOk)
            .then(({ body }) => {
                const { _id, __v } = body;
                assert.ok(_id);
                assert.equal(__v, 0);
                return body;
            });
    }

    let goal = { goal: 'Finish this lab' };
    let anotherGoal = { goal: 'Get a job' };

    beforeEach(() => saveGoal(goal).then(g => goal = g));
    beforeEach(() => saveGoal(anotherGoal).then(g => anotherGoal = g));

    it('Gets all goals per user', () => {
        return request.get('/api/users')
            .set('Authorization', token)
            .then(({ body }) => {
                delete body[0]._id;
                assert.deepEqual(body[0], { name: 'test', goals: [goal.goal, anotherGoal.goal] });
        
            });
    });
});