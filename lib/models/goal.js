const mongoose = require('mongoose');
const { Schema } = mongoose;

const schema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    // user: {
    //     type: Schema.Types.ObjectId,
    //     ref: 'user',
    //     required: true
    // }
});

Schema.statics = {
    getByUserId(id) {
        return this.find({ user: id })
            .lean();
    }
};

module.exports = mongoose.model('Goal', schema);