const { assert } = require('chai');
const User = require('../../lib/models/user');

describe('User model', () => {

    const data = {
        email: 'mariah@test.com',
    };

    const password = 'abc123';
    let user = null;
    
    beforeEach(() => {
        user = new User(data);
        user.generateHash(password);
    });

    it('generates hash from password', () => {
        assert.ok(user.hash);
        assert.notEqual(user.hash, password);
    });

    it('compares password to hash', () => {
        assert.isOk(user.comparePassword(password));
    });

});