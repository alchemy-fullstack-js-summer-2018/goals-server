const { assert } = require('chai');
const request = require('./request');
const { checkOk } = request;
const { dropCollection, createToken } = require('./db');

describe.skip('Goals API', () => {

    beforeEach(() => dropCollection('users'));
    beforeEach(() => dropCollection('goals'));

    let token, newGoal;

    beforeEach(() => {
        return createToken()
            .then(_token => token = _token);
    });

    // const userData = {
    //     name: 'Minnie Mouse',
    //     email: 'minnie@email.com',
    //     password: 'pwd123'
    // };

    // beforeEach(() => {
    //     return request
    //         .post('/api/auth/signup')
    //         .send(userData)
    //         .then(checkOk)
    //         .then(({body}) => {
    //             token = body.token;
    //             assert.isOk(token);
    //         });
    // });

    beforeEach(() => {
        return request
            .post('/api/me/goals')
            .set('Authorization', token)
            .send({
                goal: 'Get a job after school' })
            .then(checkOk) 
            .then(({body}) => {
                newGoal = body;
                

            });
    });
    
    it.skip('posts a goal', () => {
        assert.equal(newGoal.goal, 'Get a job after school');
        // assert.isOk(newGoal.createdAt);
        // assert.isOk(newGoal.updatedAt);
        // assert.isOk(newGoal);
    });

    it.skip('gets goals', () => {
        return request
            .get('/api/me/goals')
            .set('Authorization', token)
            .then(({ body }) => {
                assert.isOk(body);
            });
    });
    
    it('updates a goal', () => {
        newGoal.completed = true;
        return request
            .put('/api/me/goals')
            .set('Authorization', token)
            .send(newGoal)
            .then(({ body }) => {
                newGoal = body;
                assert.isTrue(newGoal.completed);
            });
    });

});
