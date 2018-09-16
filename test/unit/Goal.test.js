const { assert } = require('chai');
const Goal = require('../../lib/models/Goal');
const { getErrors } = require('./helpers');
const { Types } = require('mongoose'); 

describe('Goal model', () => {

    it('Validates a good model', () => {
        const data = {
            userId: Types.ObjectId(),
            goal: 'Learn React and ace it!',
            completed: false
        };
        
        const goal = new Goal(data);
      
        data._id = goal._id;
        assert.deepEqual(goal.toJSON(), data);
    });
    
      

    it('Validates required fields', () => {
        const goal = new Goal({});
        const errors = getErrors(goal.validateSync(), 2);
        assert.equal(errors.goal.kind, 'required'); 
        assert.equal(errors.userId.kind, 'required'); 
    });
});