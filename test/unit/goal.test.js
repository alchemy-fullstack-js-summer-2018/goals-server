const chai = require('chai');
const { assert } = chai;
const Goal = require('../../lib/models/goal');
const { getErrors } = require('./helpers');

describe.only('Goal model', () => {

    it('validates good model', () => {
        const data = {
            name: 'train for marathon',
            complete: false
        };
        const goal = new Goal(data);

        const json = goal.toJSON();
        delete json._id;
        assert.deepEqual(json, data);
        assert.isUndefined(goal.validateSync());
    });

    it('validates required fields', () => {
        const goal = new Goal({});
        const errors = getErrors(goal.validateSync(), 2);

        assert.equal(errors.name.kind, 'required');
        assert.equal(errors.complete.kind, 'required');
    });

});