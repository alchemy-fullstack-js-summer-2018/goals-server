const mongoose = require('mongoose');
const { Schema } = mongoose;
const { RequiredString, RequiredBoolean } = require('./required-types');

const schema = new Schema({
    name: RequiredString,
    complete: RequiredBoolean,
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
});

module.exports = mongoose.model('Goal', schema);