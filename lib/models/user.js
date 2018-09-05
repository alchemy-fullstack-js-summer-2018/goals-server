const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');

const RequiredString = {
  type: String,
  required: true
};

const schema = new Schema ({
  name: RequiredString,
  email: RequiredString,
  hash: RequiredString
});

schema.static('exists', function (query) {
  return this.find(query)
    .count()
    .then(count => (count > 0));
});

schema.method('generateHash', function (password) {
  this.hash = bcrypt.hashSync(password, this.hash);
});

module.exports = mongoose.model('User', schema);