const mongoose = require('mongoose');
const { Schema } = mongoose;

const schema = new Schema({
  subject: String,
  goalsList: [String]
});

module.exports = mongoose.model('goal', schema );
