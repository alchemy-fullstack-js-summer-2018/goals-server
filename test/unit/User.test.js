const { assert } = require('chai');
const User = require('../../lib/models/User');
const { getErrors } = require('./helpers');

describe('User model', () => {
    const data = {
        name: 'Kevin',
        email: 'kevin@email.com'
    };

    const password = 'abc';

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
        const review = new User({});
        const errors = getErrors(review.validateSync(), 3);
        assert.equal(errors.name.kind, 'required'); 
        assert.equal(errors.email.kind, 'required'); 
        assert.equal(errors.hash.kind, 'required'); 
    });
});