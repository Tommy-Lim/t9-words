var WordsFile = require('./words.js')

var words = WordsFile.words;

console.log(words);
// TRANFORM WORD TO KEY
function getKey(word){
  var key = "";
  for(var i=0; i<word.length; i++){
    key += letterToNumber(word.charAt(i));
  }
  return key;
}

function letterToNumber(letter){
  if ("abc".indexOf(letter)>=0){
    return 2;
  } else if("def".indexOf(letter)>=0){
    return 3;
  } else if("ghi".indexOf(letter)>=0){
    return 4;
  } else if("jkl".indexOf(letter)>=0){
    return 5;
  } else if("mno".indexOf(letter)>=0){
    return 6;
  } else if("pqrs".indexOf(letter)>=0){
    return 7;
  } else if("tuv".indexOf(letter)>=0){
    return 8;
  } else if("wxyz".indexOf(letter)>=0){
    return 9;
  } else {
    // add nothing; symbol
  }
}
