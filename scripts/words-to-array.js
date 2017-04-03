var async = require('async');
var fs = require('fs');

// FILE TO PULL WORDS FROM
var fileSource = "words.txt";
var fileDestination = "words.js"

// ALL WORDS FROM FILE
var words =[];

// START FILE STREAM
var input = fs.createReadStream(fileSource);

// USE TO PRINT ALL WORDS
// readLines(input, addWordToArray, printWords);

// WRITE ALL WORDS ARRAY TO FILE
readLines(input, addWordToArray, writeWordsToFile);

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

// WRITE WORD TO JS EXPORTS FILE
function writeWordsToFile(){
  var text = "module.exports = " + JSON.stringify({"words": words});
  fs.writeFile(fileDestination, text);
}
