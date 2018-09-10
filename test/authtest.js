const { assert } = require('chai');
const  request  = require('./request');
const { dropCollection } = require('./db');

const userOne = {
    name: 'Bikey McBikeface',
    email: 'bikey@bikeface.com',
    password: 'myFaceIsABike'
};

let tokenOne;

describe('Auth API', () => {
  
    beforeEach(() => dropCollection('users'));

    beforeEach(() => {
        return request
            .post('/api/auth/signup')
            .send(userOne)
            .then(({ body }) => tokenOne = body.token);
    });
    
    it('signs up a user', () => {
        assert.ok(tokenOne);
    });
    
});