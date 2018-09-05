const mongoose = require('mongoose');
const { Schema } = mongoose;

const schema = new Schema(
    {
        title: String,
        userId: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        completed: {
            type: Boolean,
            default: false
        },

    },
    {
        timestamps:true
    }
);

schema.statics = {
    getByUserId(id) {
        return this.find({ userId: id })
            .lean();
    }
};

module.exports = mongoose.model('Goals', schema);