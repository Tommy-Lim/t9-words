var fs = require('fs');

var words =[];

function readLines(input, func){
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
  })
}

function func(data){
  console.log("Line:", data);
  words.push(data);
}

var input = fs.createReadStream('test.txt');
readLines(input, func);

console.log(words);

module.exports = {
  words: words,
}
