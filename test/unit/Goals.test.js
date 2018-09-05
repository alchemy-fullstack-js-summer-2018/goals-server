const { assert } = require('chai');
const Goal = require('../../lib/models/Goal');
const { getErrors } = require('./helpers');

describe('Goals model', () => {
    it('is a valid good model', () => {
        const data = {
            goal: 'finish Gorts'
        };
        const expected = {
            goal: 'finish Gorts',
            completed: false
        };
        const goal = new Goal(data);

        expected._id = goal._id;
        assert.deepEqual(goal.toJSON(), expected);
    });

    it('checks required field', () => {
        const goal = new Goal({});
		
        const errors = getErrors(goal.validateSync(), 1);
        assert.equal(errors.goal.kind, 'required');
    });
});