const mongoose = require('mongoose');
const { Schema } = mongoose;

const schema = new Schema({


  subject: String,
  goalList: [String]
});

module.exports = mongoose.model('goal', schema );
