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
        type: Boolean
    }
});

module.exports = mongoose.model('Goal', schema);