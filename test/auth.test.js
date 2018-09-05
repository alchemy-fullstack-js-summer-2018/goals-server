const { assert } = require('chai');
// const { request, checkOk } = require('./request');
// const { dropCollection } = require('./db');

// const userOne = {
//     name: 'Bikey McBikeface',
//     email: 'bikey@bikeface.com',
//     password: 'myFaceIsABike'
// };

let tokenOne;

describe('Auth API', () => {

  
    // // beforeEach(() => dropCollection('users'));

    // beforeEach(() => {
    //     return request
    //         .post('/api/auth/signup')
    //         .send(userOne)
    //         .then(checkOk)
    //         .then(({ body }) => {
    //             tokenOne = body.token;
    //         });
    // });

    it.skip('signs up a user', () => {
        assert.isDefined(tokenOne);
    });
});