var mongoose = require('mongoose');

// WORD SCHEMA


// KEY SCHEMA

var KeySchema = new mongoose.Schema({
  Key: String,
  Words: []
})
var Key = mongoose.model('Key', KeySchema);

module.exports = {
  Key: Key
}
