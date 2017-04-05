angular.module('App')
.component('homeComp', {
  templateUrl: 'app/containers/home/home.html',
  controller: HomeCompCtrl,
  controllerAs: 'homeComp'
});

function HomeCompCtrl($timeout, $document, WordsService){
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

  // EVENT LISTENERS KEY PRESS
  $document[0].addEventListener('keydown', function(e){
    if(["0","1","2","3","4","5","6","7","8","9"].indexOf(e.key) > -1){
      homeComp.clickKey(e.key)
    } else if(e.key == "*" || e.key == "Backspace"){
      homeComp.clickKey("Ast");
    } else if(e.key == "#"){
      homeComp.clickKey("Hash");
    } else if(e.key == " "){
      homeComp.clickKey("0");
    } else if(e.key == "ArrowRight"){
      homeComp.iterateResult();
      setLastWord()
    } else if(e.key == "ArrowLeft"){
      homeComp.iterateResult(true);
      setLastWord()
    }
  })

  // EVENT LISTENER FOR RESULTS CLICKS
  $('.results').on('click', 'div', function(e){
    console.log(e.target.dataset.index);
    homeComp.currentResult = parseInt(e.target.dataset.index, 10);
    setLastWord();
    homeComp.clickKey("0");
  })

  // GET ALL WORDS AND BUILD DICT
  WordsService.getAllWords().then(function(data){
    homeComp.words = data;
    homeComp.wordsLength = homeComp.words.length;
    buildDict();
  })

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
        // DO NOTHING, WORD EXISTS
      } else{
        // ADD WORD
        node.words.push(word);
        if(homeComp.wordsAddedCount == homeComp.wordsLength){
          console.log("Dictionary loaded with", homeComp.wordsAddedCount, "words.")
          homeComp.dictLoading = false;
        }
      }
    } else{
      // WORK DEEPER INTO NODE
      var num = letterToNumber(letters.charAt(0));
      if(num in node.nodes){
        // NODE ALREADY EXISTS
      } else{
        // CREATE NODE
        node.nodes[num] = {
          words: [],
          nodes: {}
        }
      }
      // WORK DOWN TREE TO NODE
      addWordToDict(word, letters.substring(1), node.nodes[num]);
    }
  }

  function getWords(){
    // RESET WORDS
    homeComp.currentResult = 0;
    homeComp.results = [];

    // GET END OF QUERY
    var queryArray = homeComp.query.split(" ");
    if(homeComp.query.indexOf(" ") > -1){
      var lastWord = queryArray[queryArray.length - 1];
    } else{
      var lastWord = queryArray[0];
    }

    // TRAVERSE TREE TO FIND WORDS
    getWordsHelper(lastWord, homeComp.dict);

    function getWordsHelper(numbers, node){
      if(numbers.length == 0){
        // AT FINAL NODE, FIND WORDS
        if(node.words.length > 0){
          //WORDS EXIST, SET AS RESULTS
          homeComp.results = node.words;
        } else{
          // NO WORDS EXIST
          homeComp.results = [];
        }
      } else if(numbers.charAt(0) in node.nodes){
        // MOVE DOWN TO NEXT NODE IF AVAILABLE
        getWordsHelper(numbers.substring(1), node.nodes[numbers.charAt(0)]);
      } else{
        // NODE NOT AVAILABLE, END
        homeComp.results == [];
      }
    }
  }

  homeComp.clickKey = function(key){
    // DOM MANIPULATION FOR ANIMATION
    var domKey = ".key" + key;
    $(domKey).eq(0).css('background-color', 'grey');
    $(domKey).eq(0).css('transform', 'scale(0.95,0.95)');
    $timeout(function(){
      $(domKey).eq(0).css('background-color', 'lightseagreen');
      $(domKey).eq(0).css('transform', 'scale(1,1)');
    }, 100);

    // MESSAGE AND QUERY MODIFICATION BASED ON KEY PRESSED
    if(key == '1'){
      // DO NOTHING
    } else if(key == 'Hash'){
      // NEX BUTTON CLICKED
      homeComp.iterateResult();
      setLastWord()
    } else if (key == 'Ast'){
      // DELETE BUTTON CLICKED
      homeComp.message = deleteOneChar(homeComp.message);
      homeComp.query = deleteOneChar(homeComp.query);
      // FIND POSSIBLE WORDS
      getWords();
      setLastWord();
    } else if(key == '0'){
      // SPACE BUTTON HIT
      homeComp.results = [];
      if(getLastChar(homeComp.message) == " "){
        // DO NOTHING BECAUSE LAST CHAR IS SPACE
      } else{
        // ADD SPACE
        homeComp.message = addOneChar(homeComp.message, " ");
        homeComp.query = addOneChar(homeComp.query, " ");
      }
    } else{
      // LETTER KEY HIT
      homeComp.message = addOneChar(homeComp.message, key);
      homeComp.query = addOneChar(homeComp.query, key);
      // FIND POSSIBLE WORDS
      getWords();
      setLastWord()
    }
  }

  function setLastWord(){
    // FORCE DIGEST
    $timeout(function(){})
    var message = getStrStartAndEnd(homeComp.message);
    if(homeComp.results.length > 0){
      message.start.push(homeComp.results[homeComp.currentResult]);
      homeComp.message = message.start.join(" ");
    } else{
      var query = getStrStartAndEnd(homeComp.query);
      message.start.push(query.end);
      homeComp.message = message.start.join(" ");
    }
  }

  function getStrStartAndEnd(str){
    var strArr = str.split(" ");
    var strLen = strArr.length;
    var end = strArr.pop();
    return {
      start: strArr,
      end: end
    }
  }

  function deleteOneChar(str){
    var length = str.length;
    return str.substring(0,str.length-1);
  }

  function addOneChar(str, char){
    return str + char;
  }

  function getLastChar(str){
    var length = str.length;
    return str.charAt(length-1);
  }

  homeComp.iterateResult = function(reverse){
    // FORCE DIGEST
    $timeout(function(){})

    var resultLength = homeComp.results.length;
    var direction = 1;

    if(resultLength > 1){
      // ITERATE THROUGH RESULTS
      if(reverse){
        // ITERATE TO LEFT
        direction = - 1;
        if(homeComp.currentResult == 0){
          homeComp.currentResult = (resultLength - 1);
        } else{
          homeComp.currentResult += direction;
        }
      } else{
        // ITERATE TO RIGHT
        if(homeComp.currentResult < resultLength - 1){
          homeComp.currentResult += direction;
        } else{
          homeComp.currentResult = 0;
        }
      }
    }
  }

}

HomeCompCtrl.$inject = ['$timeout', '$document', 'WordsService'];
