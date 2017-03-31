var mongoose = require('mongoose');

// WORD SCHEMA

var WordSchema = new mongoose.Schema({
  Word: String,
  Key: String
})
var Word = mongoose.model('Word', WordSchema);

module.exports = {
  Word: Word
}
