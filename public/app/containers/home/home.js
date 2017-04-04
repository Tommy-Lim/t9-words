angular.module('App')
.component('homeComp', {
  templateUrl: 'app/containers/home/home.html',
  controller: HomeCompCtrl,
  controllerAs: 'homeComp'
});

function HomeCompCtrl($timeout, WordsService){
  var homeComp = this;

  // FRONT END VARS
  homeComp.query = "";
  homeComp.message = "";
  homeComp.results = [];
  homeComp.currentResult = 0;

  // DICT VARS
  homeComp.wordsAddedCount = 0;
  homeComp.dictLoading = true;
  homeComp.words = [];
  homeComp.dict = {
    words:[],
    nodes:{}
  };

  // BUILD DICT
  function buildDict(){
    console.log("Loading dictionary...")
    homeComp.words.forEach(function(word, index){
      addWordToDict(word, word, homeComp.dict);
    })
  }

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
    if(letters.length == 0){
      // Find or add word
      homeComp.wordsAddedCount++;
      if(node.words.indexOf(word) > -1){
        // do nothing, word exists
      } else{
        // add word
        node.words.push(word);
        if(homeComp.wordsAddedCount == homeComp.wordsLength){
          console.log("Dictionary loaded.")
          homeComp.dictLoading = false;
        }
      }
    } else{
      // work deeper into tree
      var num = letterToNumber(letters.charAt(0));
      if(num in node.nodes){
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

  WordsService.getAllWords().then(function(data){
    homeComp.words = data;
    homeComp.wordsLength = homeComp.words.length;
    buildDict();
  })


  homeComp.getWords = function(query){
    homeComp.currentResult = 0;
    var queryArray = query.split(" ");
    var lastWord = queryArray[queryArray.length - 1].trim();

    getWordsHelper(lastWord, homeComp.dict);

    function getWordsHelper(numbers, node){
      if(numbers.length == 0){
        homeComp.results = node.words;
        if(node.words.length>0){
          setLastWord(homeComp.results[0])
        } else{
          setLastWord(lastWord)
        }
      } else if(numbers.charAt(0) in node.nodes){
        getWordsHelper(numbers.substring(1), node.nodes[numbers.charAt(0)]);
      } else{
        homeComp.results == [];
      }
    }
  }

  homeComp.clickKey = function(key){
    var domKey = ".key" + key;
    $(domKey).eq(0).css('background-color', 'grey');
    $(domKey).eq(0).css('transform', 'scale(0.95,0.95)');
    $timeout(function(){
      $(domKey).eq(0).css('background-color', 'lightseagreen');
      $(domKey).eq(0).css('transform', 'scale(1,1)');
    }, 100);

    if(key == '1'){
      // do nothing
    } else if(key == 'Hash'){
      var resultLength = homeComp.results.length;
      if(resultLength > 1){
        // homeComp.results.push(homeComp.results.splice(0,1)[0]);
        if(homeComp.currentResult < resultLength - 1){
          homeComp.currentResult++;
        } else{
          homeComp.currentResult = 0;
        }
        setLastWord(homeComp.results[homeComp.currentResult])
      }
    } else if (key == 'Ast'){
      var queryLength = homeComp.query.length;
      if(queryLength > 0){
        homeComp.query = homeComp.query.slice(0, queryLength - 1);
        homeComp.message = homeComp.message.slice(0, queryLength - 1);
        homeComp.getWords(homeComp.query);
      } else{
        // do nothing
      }
    } else if(key == '0'){
      homeComp.lastWord = "";
      var messageLength = homeComp.message.length;
      var lastChar = homeComp.message.charAt(messageLength);
      if(lastChar != " " && homeComp.message.length>0){
        var lastSpace = homeComp.message.lastIndexOf(" ");
        var subMessage = homeComp.message.substring(0,lastSpace + 1);
        homeComp.message = subMessage;
      }
      if(homeComp.query.charAt(homeComp.query.length-1) != " "){
        homeComp.query += " ";
      }
      var word = homeComp.results[homeComp.currentResult]
      if(word){
        homeComp.message += (word + " ");
      }
      homeComp.results = [];
      homeComp.lastWord = "";
    } else{
      homeComp.query += key;
      homeComp.getWords(homeComp.query);
    }
  }

  function setLastWord(word){
    var length = homeComp.message.length;
    var lastChar = homeComp.message.charAt(length-1);
    console.log("last char", lastChar);
    if(!lastChar || lastChar == " "){
      homeComp.lastWord = word;
    } else{
      homeComp.lastWord = "";
    }
  }

}

HomeCompCtrl.$inject = ['$timeout', 'WordsService'];
