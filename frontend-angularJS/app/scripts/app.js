'use strict';

/**
 * @ngdoc overview
 * @name todoApp
 * @description
 * # todoApp
 *
 * Main module of the application.
 */
angular
  .module('todoApp', [
    'ngAnimate',
    'ngAria',
    'ngCookies',
    'ngMessages',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ui.router'
  ])
  .config(['$routeProvider','$logProvider','$stateProvider',function ($routeProvider,$logProvider,$stateProvider) {

    //logs for development
    if(window.location.origin.includes('localhost')){
      $logProvider.debugEnabled(true);
    }else{
      $logProvider.debugEnabled(false);
    }

    var login = {
      title : 'Login/SignUp',
      name: 'login',
      url : '/login',
      controller : 'MainCtrl',
      templateUrl : 'views/main.html'
    };

    var todos = {
      title : 'Your Todos',
      name: 'todos',
      url : '/todos',
      controller : 'TodosCtrl',
      templateUrl : 'views/todos.html'
    }

    $stateProvider.state(login);
    $stateProvider.state(todos);
  }])
  .run(['$log','$state',function ($log,$state) {
    if(localStorage.getItem('token')){
      $state.go('todos');
    }else{
      $state.go('login');
    }
  }]);
