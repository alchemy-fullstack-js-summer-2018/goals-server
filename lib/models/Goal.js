const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { RequiredString } = require('./required-types');

const schema = new Schema({
    goal: RequiredString,
    completed: {
        type: Boolean,
        default: false,
    }
});

module.exports = mongoose.model('Goal', schema);