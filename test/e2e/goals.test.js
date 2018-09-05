const { assert } = require('chai');
const request = require('./request');
const { dropCollection  } = require('./_db');

const checkOk = res => {
    assert.equal(res.status, 200, 'expected 200 http status code');
    return res;
};

describe.only('Goals API', () => {

    beforeEach(() => dropCollection('goals'));

    let goal1 = {
        name: 'train for marathon',
        complete: false
    };

    let goal2 = {
        name: 'watch GOT',
        complete: false
    };

    beforeEach(() => {
        return request.post('/api/goals')
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
        return request.post('/api/goals')
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
            .get('/api/goals')
            .then(checkOk)
            .then(({ body }) => {
                assert.deepEqual(body, [goal1, goal2]);
            });
    });

    //TODO: UPDATE
});