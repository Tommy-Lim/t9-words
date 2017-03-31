var models = require('../models/schemas');
var text = require('./words');
var mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/t9words');
var async = require('async');

function addWords(arr){
  arr.forEach(function(word){
    var key = getKey(word)
    console.log(key);
    models.Key.findOne({
      Key: key
    }, function(err, found){
      if(found){
        console.log("key found", key)
        if(found.Words.indexOf(word) >= 0){
          console.log(word, "exists");
        } else{
          console.log("added", word);
          found.Words.push(word);
          found.save();
        }
      } else{
        console.log("create new key", key)
        models.Key.create({
          Key: getKey(word),
          Words: [word]
        }, function(err, key){
          // console.log(word,"created");
        })
      }
    })
  })
}

function getAllKeys(){
  var result;
  models.Key.find({
  }, function(err, keys){
    console.log("all key", key);
    return key;
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

async.eachSeries(text.words, function(word, callback){
  var key = getKey(word)
  console.log(key);
  models.Key.findOne({
    Key: key
  }, function(err, found){
    if(found){
      console.log("key found", key)
      if(found.Words.indexOf(word) >= 0){
        console.log(word, "exists");
        callback();
      } else{
        console.log("added", word);
        found.Words.push(word);
        found.save();
        callback();
      }
    } else{
      console.log("create new key", key)
      models.Key.create({
        Key: getKey(word),
        Words: [word]
      }, function(err, key){
        // console.log(word,"created");
        callback();
      })
    }
  })
})
