const { assert } = require('chai');
const Goal = require('../../lib/models/goal');

describe('Goal model', () => {

    it('validates a good goal model', () => {
        const data = {
            name: 'App Idea 1',
            description: 'AR mystery game with clues on spinning cubes' 
        };
        const goal = new Goal(data);

        const json = goal.toJSON();
        delete json._id;
        assert.deepEqual(json, data);
        assert.isUndefined(goal.validateSync());
    });
});