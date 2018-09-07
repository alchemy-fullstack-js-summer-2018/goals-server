const { assert } = require('chai');
const User = require('../../lib/models/User');
const { getErrors } = require('./helpers');

describe('User model', () => {
    const data = {
        name: 'mister',
        email: 'me@me.com'
    };

    const password = 'abc';

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

    it('checks required field', () => {
        const user = new User({});
    
        const errors = getErrors(user.validateSync(), 3);
        assert.equal(errors.name.kind, 'required');
        assert.equal(errors.email.kind, 'required');
        assert.equal(errors.hash.kind, 'required');
    });
});