const { assert } = require('chai');
const User = require('../../lib/models/User');
const { getErrors } = require('./helpers');

describe('User model', () => {
    const data = {
        name: 'Marty',
        email: 'marty@email.com'
    };

    const password = 'pwd123';

    let user = null;
    beforeEach(() => {
        user = new User(data);
        user.generateHash(password);
    });

    it('Generates a hash from password', () => {
        assert.ok(user.hash);
        assert.notEqual(user.hash, password);
    });

    it('Compares password to hash', () => {
        assert.isOk(user.comparePassword(password));
    });

    it('Validates required fields', () => {
        const user = new User({});
        const errors = getErrors(user.validateSync(), 3);
        assert.equal(errors.name.kind, 'required'); 
        assert.equal(errors.email.kind, 'required'); 
        assert.equal(errors.hash.kind, 'required'); 
    });
});