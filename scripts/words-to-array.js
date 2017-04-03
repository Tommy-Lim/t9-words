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

// ADD WORD (OR HASH) TO GLOBAL WORDS
function addWordToArray(data){
  // PUSH WORD
  words.push(data);

  // PUSH HASH
  // words.push(getKey(data));
}

// PRINT WORDS USING GLOBAL ARRAY
function printWords(){
  console.log("WORDS COUNT:", words.length);
  console.log("WORDS:", JSON.stringify({words: words}));
}
