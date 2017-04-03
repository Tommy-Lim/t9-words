angular.module('App')
.service('WordsService', WordsService);

function WordsService($http){

  this.getWords = function(query){
    var req = {
      url: "/api/words/" + query,
      method: "GET"
    }

    return $http(req).then(function success(res){
      return res.data.data;
    }, function failure(res){
      console.log("ERROR", res);
    })
  }

  this.getDict = function(){
    var req = {
      url: '/api/words/all',
      method: 'GET'
    }

    $http(req).then(function success(res){
      console.log(res.data.words);
    }, function failure(res){
      console.log("ERROR", res);
    })
  }


}

WordsService.$inject = ['$http'];
