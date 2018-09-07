const mongoose = require('mongoose');
const { Schema } = mongoose;
const { RequiredString } = require('./required-types');

const schema = new Schema({
    name: RequiredString,
    complete: false,
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    details: String
});

schema.statics = {
    getByUserId(id) {
        return this.find({ userId: id })
            .lean();
    }
};

module.exports = mongoose.model('Goal', schema);