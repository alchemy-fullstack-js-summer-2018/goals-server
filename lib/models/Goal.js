const mongoose = require('mongoose');
const { Schema } = mongoose;

const schema = new Schema ({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    goal: {
        type: String,
        required: true
    },
    completed: {
        type: Boolean,
        default: false
    }
},
{
    timestamps: true
}
);

schema.statics = {
    getGoalsByUser(id) {
        return this.find({ user: id }).lean();
    }
};

module.exports = mongoose.model('Goal', schema);