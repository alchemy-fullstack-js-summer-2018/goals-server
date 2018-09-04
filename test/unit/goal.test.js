const chai = require('chai');
const { assert } = chai;
const Goal = require('../../lib/models/goal');
// const { getErrors } = require('./helpers');

describe('Goal model', () => {

    it('validates good model', () => {
        const data = {
            // example full, good data
        };
        const goal = new Goal(data);

        const json = goal.toJSON();
        delete json._id;
        assert.deepEqual(json, data);
        assert.isUndefined(goal.validateSync());
    });

});