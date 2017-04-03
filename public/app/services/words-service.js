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

  this.getAllWords = function(){
    var req = {
      url: '/api/words/all',
      method: 'GET'
    }

    return $http(req).then(function success(res){
      return res.data.words;
    }, function failure(res){
      console.log("ERROR", res);
    })
  }


}

WordsService.$inject = ['$http'];
