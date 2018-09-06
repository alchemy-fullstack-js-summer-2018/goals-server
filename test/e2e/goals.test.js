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

    it('Gets a goal', () => {
        return request
            .get('/api/me/goals')
            .set('Authorization', token)
            .then(checkOk)
            .then(({ body }) => {
                assert.deepEqual(body, [newGoal]);
            });
    });

    it('Updates a goal', () => {
        newGoal.name = 'Profit';

        return request.put(`/api/me/goals/${newGoal._id}`)
            .send(newGoal)
            .then(checkOk)
            .then(({ body }) => {
                assert.deepEqual(body, newGoal);
                return request.get(`/api/me/goals/${newGoal._id}`);
            })
            .then(({ body }) => {
                assert.equal(body.name, newGoal.name);
            });
    });

});