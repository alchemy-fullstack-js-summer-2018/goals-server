const mongoose = require('mongoose');
const { Schema } = mongoose;

const schema = new Schema({
    name: String,
    type: String,
    plannedGoals: [String]
});

module.exports = mongoose.model('Goal', schema);