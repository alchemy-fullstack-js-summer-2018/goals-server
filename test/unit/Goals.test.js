const { assert } = require('chai');
const Goal = require('../../lib/models/Goal');
const { getErrors } = require('./helpers');
const { Types } = require('mongoose'); 

describe('Goals model', () => {
    it('is a valid good model', () => {
        const data = {
            userId: Types.ObjectId(),
            goal: 'finish Gorts'
        };
        const expected = {
            ...data,
            completed: false
        };
        const goal = new Goal(data);
        
        expected._id = goal._id;
        assert.deepEqual(goal.toJSON(), expected);
    });

    it('checks required field', () => {
        const goal = new Goal({});
		
        const errors = getErrors(goal.validateSync(), 2);
        assert.equal(errors.goal.kind, 'required');
        assert.equal(errors.userId.kind, 'required');
    });
});