angular.module('App')
.component('homeComp', {
  templateUrl: 'app/containers/home/home.html',
  controller: HomeCompCtrl,
  controllerAs: 'homeComp'
});

function HomeCompCtrl($timeout, WordsService){
  var homeComp = this;
  homeComp.query = "";
  homeComp.message = "";
  homeComp.results = [];
  homeComp.currentResult = 0;

  homeComp.getWords = function(query){
    homeComp.currentResult = 0;
    var queryArray = query.split(" ");
    var lastWord = queryArray[queryArray.length - 1];
    console.log("nums", queryArray)
    console.log("lastnum", lastWord);
    WordsService.getWords(lastWord).then(function(data){
      homeComp.results = data;
      console.log("results", homeComp.results)
    });
  }

  homeComp.clickKey = function(key){
    var domKey = ".key" + key;
    $(domKey).eq(0).css('background-color', 'grey');
    $timeout(function(){
      $(domKey).eq(0).css('background-color', 'lightseagreen');
    }, 300);

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
      }
    } else if (key == 'Ast'){
      var queryLength = homeComp.query.length;
      console.log("deleting from ",homeComp.query)
      if(queryLength > 0){
        console.log("query length", queryLength);
        homeComp.query = homeComp.query.slice(0, queryLength - 1);
        homeComp.message = homeComp.message.slice(0, queryLength - 1);
        homeComp.getWords(homeComp.query);
      } else{
        // do nothing
      }
    } else if(key == '0'){
      console.log("space hit")
      console.log("Message:"+homeComp.message+"||")
      var messageLength = homeComp.message.length;
      console.log("message length:", messageLength);

      var lastChar = homeComp.message.charAt(messageLength);
      console.log("last char is |"+lastChar+"|");
      if(lastChar != " " && homeComp.message.length>0){
        console.log("last char not space, so substring")
        var lastSpace = homeComp.message.lastIndexOf(" ");
        console.log("last space index", lastSpace);
        var subMessage = homeComp.message.substring(0,lastSpace + 1);
        console.log(subMessage);
        homeComp.message = subMessage;
      }
      homeComp.query += " ";
      var word = homeComp.results[homeComp.currentResult]
      if(word){
        homeComp.message += (word + " ");
      } else {
        homeComp.message += " ";
      }
      homeComp.results = [];
    } else{
      homeComp.query += key;
      homeComp.getWords(homeComp.query);
    }
  }

  homeComp.getLastWord = function(str){
    var queryArray = str.split(" ");
    var lastWord = queryArray[queryArray.length - 1];
    return lastWord;
  }

}

HomeCompCtrl.$inject = ['$timeout', 'WordsService'];
