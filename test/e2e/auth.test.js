const { assert } = require('chai');
const request = require('../request');
const { dropCollection } = require('../db');

const userOne = {
    name: 'Stef',
    email: 'stef@robyn.com',
    password: '12345678'
};

// const userTwo = {
//     name: 'Robyn',
//     email: 'robyn@stef.com',
//     password: '12345678'
// };

const badPassword = {
    name: 'Robyn',
    email: 'robyn@stef.com',
    password: '22345678'
};

const badEmail = {
    name: 'Robyn',
    email: 'robin@stef.com',
    password: '12345678'
};

let tokenOne;
// let tokenTwo;

xdescribe('Auth Api', () => {
    beforeEach(() => dropCollection('users'));

    beforeEach(() => {
        return request
            .post('/api/auth/signup')
            .send(userOne)
            .then(({ body }) => tokenOne = body.token);
    });

    it('singup', () => {
        assert.ok(tokenOne);
    });

    it('verifies', () => {
        return request
            .get('/api/auth/verify')
            .set('Authorization', tokenOne)
            .then(({ body }) => {
                assert.isOk(body.valid);
            });
    });

    it('signin', () => {
        return request
            .post('/api/auth/signin')
            .send(userOne)
            .then(({ body }) => {
                assert.ok(body.token);
            });
    });

    xit('Gives 400 on signup of same email', () => {
        return request
            .post('/api/auth/signup')
            .send(userOne)
            .then(res => {
                assert.equal(res.status, 400);
                assert.equal(res.body.error, 'email already in use');
            });
    });

    xit('Gives 401 on non-existent email', () => {
        return request
            .post('/api/auth/signin')
            .send(badEmail)
            .then(res => {
                assert.equal(res.status, 401);
                assert.equal(res.body.error, 'Invalid Login');
            });
    });

    xit('Gives 401 on bad password', () => {
        return request
            .post('/api/auth/signin')
            .send(badPassword)
            .then(res => {
                assert.equal(res.status, 401);
                assert.equal(res.body.error, 'Invalid Login');
            });
    });

});