const mongoose = require('mongoose');
const { RequiredString } = require('./required-types');
const { Schema } = mongoose;

const schema = new Schema({
    goal: RequiredString,
    completed: {
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model('Goal', schema);