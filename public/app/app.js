angular.module('App', ['ui.router', 'ui.bootstrap'])
.config([
  '$stateProvider',
  '$urlRouterProvider',
  '$locationProvider',
  function(
    $stateProvider,
    $urlRouterProvider,
    $locationProvider
  ){
    $urlRouterProvider.otherwise('/');
    $locationProvider.html5Mode(true);

    $stateProvider
    .state('homeState', {
      url: '/',
      component: 'homeComp'
    })
  }
])
