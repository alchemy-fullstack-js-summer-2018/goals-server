const mongoose = require('mongoose');
// const { RequiredString } = require('./required-types');
const { Schema } = mongoose;

const schema = new Schema({
    goal: String,
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    completed: {
        type: Boolean,
        default: false
    }
});

schema.statics = {
    getByUserId(id) {
        return this.find({ userId: id })
            .lean();
    }
};

module.exports = mongoose.model('Goal', schema);