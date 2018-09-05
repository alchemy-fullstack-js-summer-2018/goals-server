const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { RequiredString } = require('./required-types');

const schema = new Schema(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        goal: RequiredString,
        completed: {
            type: Boolean,
            default: false,
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model('Goal', schema);