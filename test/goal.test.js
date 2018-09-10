const { assert } = require('chai');
const Goal = require('../lib/models/goal');

const mock = {
    name: 'New Car',
    description: '2020 Toyota Tacoma'
};

describe('Goal model', () => {
    it('validates good model', () => {
        const goal = new Goal(mock);
        assert.equal(goal.name, mock.name);
        assert.equal(goal.description, mock.description);
    });
});