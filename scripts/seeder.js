console.log("top");
var models = require('../models/schemas');
var text = require('./words');
var mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/t9words');

console.log(text.wordsShort);

var words = ["test", "apple"];

function addWords(arr){
  arr.forEach(function(word){
    models.Word.findOne({
      Word: word
    }, function(err, word){
      if(word){
        console.log(word, "already exists");
      } else{
        models.Word.create({
          Word: word
        }, function(err, word){
          console.log(word,"created");
        })
      }
    })
  })
}

function getAllWords(){
  models.Word.find({

  }, function(err, words){
    console.log(words);
  })
}

console.log(words, "to add");

addWords(words);
getAllWords();
