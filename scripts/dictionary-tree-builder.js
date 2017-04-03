var WordsFile = require('./words.js')

// var words = WordsFile.words;
var words = ["dad", "bad", "apple"];

var dict = {
  words:[],
  nodes:{}
};

console.log(words);

words.forEach(function(word){
  addWordToDict(word, word, dict);
})

console.log(JSON.stringify(dict));

// TRANFORM WORD TO KEY
function wordToKey(word){
  var key = "";
  for(var i=0; i<word.length; i++){
    key += letterToNumber(word.charAt(i));
  }
  return key;
}

// TRANFORM LETTER TO NUMBER
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

// ADD WORD TO DICTIONARY
function addWordToDict(word, letters, node){
  console.log(word, letters, node)
  if(letters.length == 0){
    // Find or add word
    if(node.words.indexOf(word) > -1){
      // do nothing, word exists
    } else{
      // add word
      node.words.push(word);
    }
  } else{
    // work deeper into tree
    var num = letterToNumber(letters.charAt(0));
    if(num in node){
      // node already exists
    } else{
      // create node
      node.nodes[num] = {
        words: [],
        nodes: {}
      }
    }
    // work down tree to node
    addWordToDict(word, letters.substring(1), node.nodes[num]);
  }
}
