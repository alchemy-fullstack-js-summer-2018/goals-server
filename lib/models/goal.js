const mongoose = require('mongoose');
const { Schema } = mongoose;

const schema = new Schema({
    name: String,
    description: String
});

module.exports = mongoose.model('Goal', schema);