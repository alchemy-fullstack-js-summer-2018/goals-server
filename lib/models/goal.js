const mongoose = require('mongoose');
const { Schema } = mongoose;

const schema = new Schema({

  goal: {
    type: String,
    required: true
  },
  completed: {
    type: Boolean,
    required: true
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
  // goalList: [String],
});

module.exports = mongoose.model('Goal', schema );
