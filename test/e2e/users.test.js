const { assert } = require('chai');
const request = require('../request');
const { checkOk } = request;
const { dropCollection, createToken } = require('../db');

describe('Users API', () => {

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
            });
    });

    it('gets users', () => {
        return request
            .get('/api/users')
            .set('Authorization', token)
            .then(checkOk)
            .then(({ body }) => {
                assert(body, [{
                    _id: testGoal.author,
                    completed: 0,
                    total: 1,
                    name: 'Mr. White' 
                }]);
            });
    });
});