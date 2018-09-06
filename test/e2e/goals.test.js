const { assert } = require('chai');
const request = require('./request');
const { checkOk } = request;
const { dropCollection, createToken } = require('./db');

describe('Goals API', () => {
    beforeEach(() => dropCollection('users'));
    beforeEach(() => dropCollection('goals'));

    let token;
    let newGoal;

    beforeEach(() => {
        return createToken()
            .then(_token => token = _token);
    });

    beforeEach(() => {
        return request
            .post('/api/me/goals')
            .set('Authorization', token)
            .send({
                name: 'Get a job',
                description: 'Go to meetups, job fairs, etc.',
                completed: false
            })
            .then(checkOk)
            .then(({ body }) => {
                newGoal = body;
            });
    });

    it('Saves a goal', () => {
        assert.equal(newGoal.name, 'Get a job');
    });

});