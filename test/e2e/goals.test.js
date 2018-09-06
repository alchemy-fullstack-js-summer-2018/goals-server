const { assert } = require('chai');
const request = require('./request');
const { Types } = require('mongoose');
const { dropCollection, createToken } = require('./db');

describe.only('Goals API', () => {

    beforeEach(() => dropCollection('users'));
    beforeEach(() => dropCollection('goals'));

    let token = '';
    before(() => createToken().then(t => token = t));

    let goal = {
        user: Types.ObjectId().toHexString(),
        goal: 'Finish this lab',
        completed: false
    };

    const checkOk = res => {
        if(!res.ok) throw res.error;
        return res;
    };

    it('saves a goal', () => {
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
                assert.deepEqual(body, { ...goal, _id, __v });
                goal = body;
            });
    });

    it('gets a goal by id', () => {
        return request.post('/api/goals')
            .set('Authorization', token)
            .send(goal)
            .then(checkOk)
            .then(({ body }) => {
                goal = body;
                return request.get(`/api/goals/${goal._id}`)
                    .set('Authorization', token);
            })
            .then(({ body }) => {
                assert.deepEqual(body, goal);
            });
    });

});