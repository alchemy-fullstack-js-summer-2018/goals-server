const chai = require('chai');
const { assert } = chai;
const User = require('../../lib/models/user');
// const { getErrors } = require('./helpers');

describe('User model', () => {

    it('validates good model', () => {
        const data = {
            // example full, good data
        };
        const user = new User(data);

        const json = user.toJSON();
        delete json._id;
        assert.deepEqual(json, data);
        assert.isUndefined(user.validateSync());
    });

});