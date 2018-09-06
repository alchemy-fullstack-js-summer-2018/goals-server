const { assert } = require('chai');
const request = require('./request');
const { dropCollection, createToken } = require('./db');

describe.only('Goals API', () => {

    beforeEach(() => dropCollection('users'));
    beforeEach(() => dropCollection('goals'));

    let token = '';
    before(() => createToken().then(t => token = t));
    
    // const userId = Types.ObjectId().toHexString();

    let goal = { goal: 'Finish this lab' };

    let anotherGoal = { goal: 'Get a job' };

    const checkOk = res => {
        if(!res.ok) throw res.error;
        return res;
    };

    beforeEach(() => {
        return request.post('/api/goals')
            .set('Authorization', token)
            .send(goal)
            .then(checkOk)
            .then(({ body }) => {
                delete body.createdAt;
                delete body.updatedAt;
                const { _id, __v } = body;
                assert.ok(_id);
                assert.equal(__v, 0);
                goal = body;
            });
    });

    beforeEach(() => {
        return request.post('/api/goals')
            .set('Authorization', token)
            .send(anotherGoal)
            .then(checkOk)
            .then(({ body }) => {
                delete body.createdAt;
                delete body.updatedAt;
                const { _id, __v } = body;
                assert.ok(_id);
                assert.equal(__v, 0);
                anotherGoal = body;
            });
    });

    it('gets a goal by id', () => {
        return request.get(`/api/goals/${goal._id}`)
            .set('Authorization', token)
            .then(({ body }) => {
                assert.deepEqual(body.goal, goal.goal);
            });
    });

    it('gets all goals by user', () => {
        return request.get('/api/goals/user')
            .set('Authorization', token)
            .then(({ body }) => console.log('BODY', body));
    });

});