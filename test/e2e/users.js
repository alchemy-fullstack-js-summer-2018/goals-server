const { assert } = require('chai');
const request = require('./request');
const { checkOk } = request;
const { dropCollection, createToken } = require('./db');

describe('Users API', () => {
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

    it('gets all users', () => {
        const expected = {
            _id: savedGoal.userId,
            name: 'mister',
            completed: 0,
            total: 1
        };
        return request
            .get('/api/users')
            .set('Authorization', token)
            .then(checkOk)
            .then(({ body }) => {
                assert.deepEqual(body, [expected]);
            });
    });

});