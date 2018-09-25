const { assert } = require('chai');
const request = require('./request');
const { checkOk } = request;
const { dropCollection } = require('./db');


describe('Goals API', () => {
    
    beforeEach(() => dropCollection('users'));
    beforeEach(() => dropCollection('goals'));
    
    let token, newGoal;

    const userData = {
        name: 'Minnie Mouse',
        email: 'minnie@email.com',
        password: 'pwd123'
    };

    beforeEach(() => {
        return request
            .post('/api/auth/signup')
            .send(userData)
            .then(checkOk)
            .then(({body}) => {
                token = body.token;
                // assert.isOk(token);
            });
    });

    beforeEach(() => {
        return request
            .post('/api/me/goals')
            .set('Authorization', token)
            .send({
                goal: 'Get a job after school' })
            .then(({body}) => {
                newGoal = body;
            });
    });
    
    it('posts a goal correctly', () => {
        assert.isOk(newGoal);
    });

    it('gets goals', () => {
        return request
            .get('/api/me/goals')
            .set('Authorization', token)
            .then(({ body }) => {
                assert.isOk(body);
            });
    });
    
    it.skip('updates a goal', () => {
        newGoal.completed = true;
        return request
            .put('/api/me/goals')
            .set('Authorization', token)
            .send(newGoal)
            .then(({ body }) => {
                newGoal = body;                
                assert.isTrue(newGoal.completed, true);
            });
    });

    
   
});
