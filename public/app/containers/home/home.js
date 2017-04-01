angular.module('App')
.component('homeComp', {
  templateUrl: 'app/containers/home/home.html',
  controller: HomeCompCtrl,
  controllerAs: 'homeComp'
});

function HomeCompCtrl(WordsService){
  var homeComp = this;
  homeComp.query = "";

  homeComp.getWords = function(query){
    WordsService.getWords(query);
  }
}

HomeCompCtrl.$inject = ['WordsService'];
