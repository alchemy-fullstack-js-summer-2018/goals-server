const { assert } = require('chai');
const { getErrors } = require('../helpers.js');
const { Types } = require('mongoose');
const Goal = require('../../lib/models/Goal');

describe('goal model', () => {

    it('validates a good model', () => {
        const data = {
            user: Types.ObjectId(),
            goal: 'Finish this lab.',
            completed: false
        };

        const goal = new Goal(data);
        assert.equal(goal.user, data.user);
        assert.equal(goal.goal, data.goal);
        assert.equal(goal.completed, data.completed);
    });
    
    it('validates required fields', () => {
        const goal = new Goal({});
        const errors = getErrors(goal.validateSync(), 2);
        assert.equal(errors.user.kind, 'required');
        assert.equal(errors.goal.kind, 'required');
    });

});