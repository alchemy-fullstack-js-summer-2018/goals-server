const { assert } = require('chai');
const { dropCollection } = require('./db');
const request = require('./request');

const checkOk = res => {
    assert.equal(res.status, 200, 'expected 200 http status code');
    return res;
};

const user = {
    name: 'todd motto',
    email: 'me@motto.com',
    password: 'abc'
};

describe('Goals API', () => {

    beforeEach(() => dropCollection('users'));
    beforeEach(() => dropCollection('goals'));

    let token;

    beforeEach(() => {
        return request
            .post('/api/auth/signup')
            .send(user)
            .then(checkOk)
            .then(({ body }) => {
                token = body.token;
                assert.isOk(token);
            });
    });

    beforeEach(() => {
        return request
            .get('/api/auth/verify')
            .set('Authorization', token)
            .then(({ body }) => {
                assert.isOk(body.valid);
            });
    });
});