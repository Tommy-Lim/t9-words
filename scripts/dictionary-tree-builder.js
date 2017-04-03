var async = require('async');
var fs = require('fs');

// FILE TO PULL WORDS FROM
var fileName = "words.txt";

// ALL WORDS FROM FILE
var words =[];

// START FILE STREAM
var input = fs.createReadStream(fileName);

// USE TO PRINT ALL WORDS
readLines(input, addWordToArray, printWords);

// READ LINES FROM FILE AND RUN FUNC FOR EACH AND CB AT END
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

// ADD WORD TO GLOBAL WORDS
function addWordToArray(data){
  words.push(data);
}

// TRANFORM WORD TO KEY
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

// PRINT WORDS USING GLOBAL ARRAY
function printWords(){
  console.log("WORDS COUNT:", words.length);
  console.log("WORDS:", JSON.stringify({words: words}));
}
