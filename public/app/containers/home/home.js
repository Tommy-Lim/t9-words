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
    console.log(queryArray, lastWord);
    homeComp.results = WordsService.getWords(query).data;
    console.log(homeComp.results)
  }
}

HomeCompCtrl.$inject = ['WordsService'];
