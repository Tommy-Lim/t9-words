angular.module('App')
.component('homeComp', {
  templateUrl: 'app/containers/home/home.html',
  controller: HomeCompCtrl,
  controllerAs: 'homeComp'
});

function HomeCompCtrl(WordsService){
  var homeComp = this;
  homeComp.query = "";
  homeComp.results = [];
  homeComp.currentResult = 0;

  homeComp.getWords = function(query){
    homeComp.currentResult = 0;
    var queryArray = query.split(" ");
    var lastWord = queryArray[queryArray.length - 1];
    console.log(queryArray, lastWord)
    WordsService.getWords(query).then(function(data){
      homeComp.results = data;
    });
    console.log("results", homeComp.results)
  }

  homeComp.clickKey = function(key){
    if(key == 1){
      // do nothing
    } else if(key == '#'){
      var resultLength = homeComp.results.length;
      if(resultLength > 1){
        // homeComp.results.push(homeComp.results.splice(0,1)[0]);
        if(homeComp.currentResult < resultLength - 1){
          homeComp.currentResult++;
        } else{
          homeComp.currentResult = 0;
        }
      }
    } else if (key == '*'){
      var queryLength = homeComp.query.length;
      if(queryLength > 0){
        homeComp.query = homeComp.query.slice(0, queryLength - 1);
        homeComp.getWords(homeComp.query);
      } else{
        // do nothing
      }
    } else if(key == 0){
      homeComp.query += " ";
      homeComp.currentResult = 0;
      // homeComp.getWords(homeComp.query);
      homeComp.results = [];
    } else{
      homeComp.query += (key + "");
      homeComp.getWords(homeComp.query);
    }
  }

  homeComp.getLastWord = function(str){
    var queryArray = str.split(" ");
    var lastWord = queryArray[queryArray.length - 1];
    return lastWord;
  }

}

HomeCompCtrl.$inject = ['WordsService'];
