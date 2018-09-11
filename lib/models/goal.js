const mongoose = require('mongoose');
const { Schema } = mongoose;

const schema = new Schema({
    name: {
        type: String,
        required: true
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
});

schema.statics = {
    getByUserId(id) {
        return this.find({ userId: id })
            .lean();
    }
};

module.exports = mongoose.model('Goal', schema);