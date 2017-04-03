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

  homeComp.getWords = function(query){
    var queryArray = query.split(" ");
    var lastWord = queryArray[queryArray.length - 1];
    console.log(queryArray, lastWord)
    WordsService.getWords(query).then(function(data){
      homeComp.results = data;
    });
    console.log("results", homeComp.results)
  }

  homeComp.clickKey = function(key){
    if(key == 1 || key == '#'){
      // do nothing
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
      homeComp.getWords(homeComp.query);
    } else{
      homeComp.query += (key + "");
      homeComp.getWords(homeComp.query);
    }
  }
}

HomeCompCtrl.$inject = ['WordsService'];
