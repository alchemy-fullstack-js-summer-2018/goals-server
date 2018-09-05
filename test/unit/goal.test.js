const { assert } = require('chai');
const Goal = require('../../lib/models/goal');

describe('Goal model', () => {
    it('is a valid good model', () => {
        const data = {
            goal: 'finish the lab'
        };
        const expected = {
            goal: 'finish the lab',
            completed: false
        };
        const goal = new Goal(data);

        expected._id = goal._id;
        assert.deepEqual(goal.toJSON(), expected);
    });
});