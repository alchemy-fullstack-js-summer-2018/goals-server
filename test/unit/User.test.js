const { assert } = require('chai');
const { getErrors } = require('../helpers.js');
const User = require('../../lib/models/User.js');

describe('user model', () => {
    const credentials = {
        name: 'Test',
        email: 'test@test.com',
        password: 'test123',
        roles:[]
    };

    let user = null;

    beforeEach(() => {
        user = new User(credentials);
        user.generateHash(credentials.password);
    });

    it('validates a good model', () => {
        assert.equal(user.name, credentials.name);
        assert.equal(user.email, credentials.email);
        assert.isDefined(user.hash, 'hash is defined');
        assert.notEqual(user.hash, credentials.password, 'hash is not the same as password');
        assert.isTrue(user.comparePassword(credentials.password), 'compare good password');
        assert.isFalse(user.comparePassword('bad password'), 'compare bad password');
        assert.isUndefined(user.password, 'password should be set');
    });

    it('validates required fields', () => {
        const user = new User({});
        const errors = getErrors(user.validateSync(), 3);
        assert.equal(errors.name.kind, 'required');
        assert.equal(errors.email.kind, 'required');
        assert.equal(errors.hash.kind, 'required');
    });

});