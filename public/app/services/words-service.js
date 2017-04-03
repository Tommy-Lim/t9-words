angular.module('App')
.service('WordsService', WordsService);

function WordsService($http){

  this.getWords = function(query){
    var req = {
      url: "/api/words/" + query,
      method: "GET"
    }

    return $http(req).then(function success(res){
      console.log(res);
      return res;
    }, function failure(res){
      console.log("ERROR", res);
    })
  }


}

WordsService.$inject = ['$http'];
