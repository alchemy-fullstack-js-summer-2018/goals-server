const mongoose = require('mongoose');
const { Schema } = mongoose;
// const plugin = require('./register-plugins');

const RequiredString = {
    type: String,
    required: true
};

const schema = new Schema({
    name: RequiredString,
    description: RequiredString,
    completed: {
        type: Boolean,
        default: false
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
    },

    toggleCompleteById(id) {
        return this.findById(id)
            .lean()
            .then(({ _id, completed }) => {
                return this.updateById(_id, { completed: !completed });
            });
    }
};

module.exports = mongoose.model('Goal', schema);