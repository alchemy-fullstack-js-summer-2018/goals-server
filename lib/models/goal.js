const mongoose = require('mongoose');
const { Schema } = mongoose;

const schema = new Schema({


  subject: {
    type: String,
    required: true
  },
  goalList: [String],


});

module.exports = mongoose.model('goal', schema );
