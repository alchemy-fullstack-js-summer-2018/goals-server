const { assert } = require('chai');
const Goal = require('../../lib/models/Goal');
const { getErrors } = require('./helpers');
const { Types } = require('mongoose'); 

describe('Goals model', () => {
    it('is a valid good model', () => {
        const data = {
            userId: Types.ObjectId(),
            name: 'Complete Code School. Get a Job.',
            details: 'End of September is coming up fast. Time to start planning for the next steps.',
            complete: false
        };
        const expected = data;
        const goal = new Goal(data);
        
        expected._id = goal._id;
        assert.deepEqual(goal.toJSON(), expected);
    });

    it('checks required field', () => {
        const goal = new Goal({});
		
        const errors = getErrors(goal.validateSync(), 2);
        assert.equal(errors.name.kind, 'required');
        assert.equal(errors.userId.kind, 'required');
    });
});
