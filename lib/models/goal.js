const mongoose = require('mongoose');
const { RequiredString } = require('./required-types');
const { Schema } = mongoose;

const schema = new Schema({
    goal: RequiredString,
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    completed: {
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model('Goal', schema);