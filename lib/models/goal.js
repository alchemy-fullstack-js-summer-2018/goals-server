const mongoose = require('mongoose');
const { Schema } = mongoose;
const { RequiredString, RequiredBoolean } = require('./required-types');

const schema = new Schema({
    name: RequiredString,
    complete: RequiredBoolean,
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});

schema.statics = {
    getByUserId(id) {
        return this.find({ userId: id })   
            .lean();
    }
};

module.exports = mongoose.model('Goal', schema);