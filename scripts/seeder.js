var models = require('../models/schemas');
var text = require('./words');
var mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/t9words');

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
          Key: getKey(word)
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

function getKey(word){
  var key = "";
  for(var i=0; i<word.length; i++){
    var letter = word.charAt(i);
    if ("abc".indexOf(letter)>=0){
      key += 2;
    } else if("def".indexOf(letter)>=0){
      key += 3;
    } else if("ghi".indexOf(letter)>=0){
      key += 4;
    } else if("jkl".indexOf(letter)>=0){
      key += 5;
    } else if("mno".indexOf(letter)>=0){
      key += 6;
    } else if("pqrs".indexOf(letter)>=0){
      key += 7;
    } else if("tuv".indexOf(letter)>=0){
      key += 8;
    } else if("wxyz".indexOf(letter)>=0){
      key += 9;
    } else {
      // add nothing; symbol
    }
  }
  return key;
}
addWords(text.words);
getKey("apple");
