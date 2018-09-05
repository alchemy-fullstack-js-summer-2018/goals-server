const mongoose = require('mongoose');
const { Schema } = mongoose;

const schema = new Schema({
    name: String,
    type: String,
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    description: [String]
});

module.exports = mongoose.model('Goal', schema);