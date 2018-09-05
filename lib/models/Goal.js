const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RequiredString = {
    type: String,
    required: true
};

const schema = new Schema({
    name: RequiredString,
    description: RequiredString,
    completed: {
        type: Boolean,
        required: true
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});

schema.statics = {
    getUserById(id) {
        return this.find({ userId: id });
    }
};

module.exports = mongoose.model('Goal', schema);