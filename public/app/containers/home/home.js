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
    WordsService.getWords(lastWord).then(function(data){
      homeComp.results = data;
    });
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
