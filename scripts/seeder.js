var models = require('../models/schemas');
var mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/t9words');
var async = require('async');
var fs = require('fs');

// GET WORDS
var words =[];
var fileName = "test.txt";

function readLines(input, func, cb){
  var remaining = '';

  input.on('data', function(data){
    remaining += data;
    var index = remaining.indexOf("\n");
    while(index>-1){
      var line = remaining.substring(0,index);
      remaining = remaining.substring(index + 1);
      func(line);
      index = remaining.indexOf('\n');
    }
  })

  input.on('end', function(){
    if(remaining.length > 0){
      func(remaining);
    }
    cb();
  })

}

function func(data){
  words.push(data);
}

var input = fs.createReadStream(fileName);
readLines(input, func, seedDB);


// ADD WORDS TO DB

function getAllKeys(){
  var result;
  models.Key.find({
  }, function(err, keys){
    console.log("all keys", keys);
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

function seedDB(){
  async.eachSeries(words, function(word, callback){
    var key = getKey(word)
    models.Key.findOne({
      Key: key
    }, function(err, found){
      if(found){
        // key found
        if(found.Words.indexOf(word) >= 0){
          // word already exists
          callback();
        } else{
          // word added
          found.Words.push(word);
          found.save();
          callback();
        }
      } else{
        // creating new key and adding word
        models.Key.create({
          Key: getKey(word),
          Words: [word]
        }, function(err, key){
          // word created
          callback();
        })
      }
    })
  }, function(err){
    if(err){
      console.log("Async Seed Error:", err)
    } else{
      console.log("Finished seeding DB with all words.");
    }
  })
}
