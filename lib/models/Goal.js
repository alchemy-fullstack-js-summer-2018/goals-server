const mongoose = require('mongoose');
const { Schema } = mongoose;
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

schema.statics = {
    getByUserId(id) {
        return this.find({ userId: id })
            .lean();

    }
};

module.exports = mongoose.model('Goal', schema);