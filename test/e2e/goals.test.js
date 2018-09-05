const { assert } = require('chai');
const request = require('./request');
const { dropCollection, createToken } = require('./db');

const checkOk = res => {
    assert.equal(res.status, 200, 'expected 200 http status code');
    return res;
};


describe('Goals API', () => {
    beforeEach(() => dropCollection('users'));
    beforeEach(() => dropCollection('goals'));
    
    
    let token, savedGoal;
    beforeEach(() => {
        return createToken()
            .then(_token => token = _token);
    });

    beforeEach(() => {
        return request
            .post('/api/me/goals')
            .set('Authorization', token)
            .send({ goal: 'finish Gorts' })
            .then(checkOk)
            .then(({ body }) => {
                savedGoal = body;
            });
    });

    it('saves a goal', () => {
        assert.equal(savedGoal.goal, 'finish Gorts');
        assert.isOk(savedGoal.createdAt);
        assert.isOk(savedGoal.updatedAt);
    });
    
    it('gets a goal', () => {
        return request
            .get('/api/me/goals')
            .set('Authorization', token)
            .then(checkOk)
            .then(({ body }) => {
                assert.deepEqual(body, [savedGoal]);
            });
    });

    it('toggles complete of goal', () => {
        const { _id } = savedGoal;
        return request
            .post(`/api/me/goals/${_id}`)
            .set('Authorization', token)
            .then(checkOk)
            .then(({ body }) => {
                assert.deepEqual(body.completed, true);
            });
    });

});