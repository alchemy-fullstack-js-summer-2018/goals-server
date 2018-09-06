const { assert } = require('chai');
const request = require('./request');
const { dropCollection  } = require('./_db');

const checkOk = res => {
    assert.equal(res.status, 200, 'expected 200 http status code');
    return res;
};

describe.only('Goals API', () => {

    beforeEach(() => dropCollection('users'));
    beforeEach(() => dropCollection('goals'));

    let token = null;

    let user = {
        name: 'mariah',
        email: 'test@test.com',
        password: 'abc'
    };

    let data1 = {
        name: 'train for marathon',
        complete: false
    };

    let data2 = {
        name: 'watch GOT',
        complete: false
    };

    let goal1;
    let goal2;

    beforeEach(() => {
        return request
            .post('/api/auth/signup')
            .send(user)
            .then(({ body }) => token = body.token);
    });

    function save(data) {
        return request
            .post('/api/me/goals')
            .set('Authorization', token)
            .send(data)
            .then(checkOk)
            .then(({ body }) => body);
    }

    beforeEach(() => save(data1).then(goal => goal1 = goal));
    beforeEach(() => save(data2).then(goal => goal2 = goal));
    

    it('saves a goal', () => {
        assert.isOk(goal1._id);
        assert.isOk(goal2._id);
    });

    it('gets all goals', () => {
        return request
            .get('/api/me/goals')
            .set('Authorization', token)
            .then(checkOk)
            .then(({ body }) => {
                assert.deepEqual(body, [goal1, goal2]);
            });
    });

    it('updates a goal', () => {
        goal1.complete = true;
        return request
            .put(`/api/me/goals/${goal1._id}`)
            .set('Authorization', token)
            .send(goal1)
            .then(checkOk)
            .then(({ body }) => {
                assert.equal(body.complete, goal1.complete);
            });
    });
});