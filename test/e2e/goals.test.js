const { assert } = require('chai');
const request = require('../request');
const { dropCollection } = require('./db');
// const { Types } = require('mongoose');

describe.only('goals API', () => {

    beforeEach(() => dropCollection('users'));
    beforeEach(() => dropCollection('goals'));

    let token, testGoal;

    const testUserData = {
        name: 'Injoong',
        email: 'me@me.com',
        password: 'abc123'
    };

    beforeEach(() => {
        return request
            .post('/api/auth/signup')
            .send(testUserData)
            .then(({body}) => {
                token = body.token;
            });
    });

    beforeEach(() => {
        return request
            .post('/api/me/goals')
            .set('Authorization', token)
            .send({
                title: 'Finish making gorts'
            })
            .then(({body}) => {
                // console.log(body);
                testGoal = body;

            });
    });
    
    it('posts a goal to the database', () => {
        assert.isOk(testGoal);
    });

    it('gets goals out of the database', () => {
        return request
            .get('/api/me/goals')
            .set('Authorization', token)
            .then(({ body }) => {
                console.log('**GET**', body);
                assert.isOk(body);
            });
    });

});