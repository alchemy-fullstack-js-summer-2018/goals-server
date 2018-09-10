const { assert } = require('chai');
const Goal = require('../../lib/models/Goal');
const { getErrors } = require('./helpers');

describe('Goal model', () => {

    it('Validates a good model', () => {
        const data = {
            name: 'Get better at coding!',
            description: 'Practice, practice, practice',
            completed: false,
        };
    
        const goal = new Goal(data);
    
        data._id = goal._id;
        assert.deepEqual(goal.toJSON(), data);

    });

    it('Validates required fields', () => {
        const goal = new Goal({});
        const errors = getErrors(goal.validateSync(), 3);
        assert.equal(errors.name.kind, 'required'); 
        assert.equal(errors.description.kind, 'required');
        assert.equal(errors.userId.kind, 'required'); 
    });
});