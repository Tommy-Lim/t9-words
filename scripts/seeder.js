var models = require('../models/schemas');
var text = require('./words');
var mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/t9words');

// console.log("words short", text.words);

function addWords(arr){
  arr.forEach(function(word){
    models.Word.findOne({
      Word: word
    }, function(err, found){
      if(found){
        // console.log(found, "already exists");
      } else{
        models.Word.create({
          Word: word,
          Key: "test"
        }, function(err, word){
          // console.log(word,"created");
        })
      }
    })
  })
}

function getAllWords(){
  var result;
  models.Word.find({
  }, function(err, words){
    console.log("all words", words);
    return words;
  })
}

addWords(text.words);
console.log(getAllWords());
