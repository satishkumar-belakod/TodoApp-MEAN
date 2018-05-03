'use strict';

/**
 * @ngdoc function
 * @name todoApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the todoApp
 */
angular.module('todoApp')
  .controller('MainCtrl', function ($scope,$log,todoService,$state) {

    $scope.show_register_form = false;
    $scope.user_interaction = false;

    $scope.toggle_forms = function (form) {
      $scope.user_interaction = true;
      $scope.show_register_form = (form === 'register') ? true : false;
    };

    $scope.register_user = function () {
      $log.debug('In register ');
      $log.debug('email ', $scope.register_email);
      $log.debug('password ', $scope.register_password);
      var data = {
        email : $scope.register_email,
        password : $scope.register_password
      };
      todoService.register(data).then(function (success) {
        $log.debug('Success ', success);
        if(success.status === 200){
          $log.debug('Registered Successfully');
          $log.debug('token ', success.headers('x-auth'));
          localStorage.setItem('token',success.headers('x-auth'));
          //go to next state
          $state.go('todos');
        }else{
          //Something went wrong..Please try later
        }
      }).catch(function (error) {
        $log.debug('Error ', error);
      });
    };

    $scope.login = function () {
      $log.debug('In login');
      $log.debug('email ', $scope.login_email);
      $log.debug('password ',$scope.login_password);
      var data = {
        'email' : $scope.login_email,
        'password' : $scope.login_password
      };
      todoService.login(data).then(function (response) {
        $log.debug('Response from login ', response);
        if(response.status === 200){
          $log.debug('token ',response.headers('x-auth'));
          if(response.headers('x-auth')){
            localStorage.setItem('token',response.headers('x-auth'));
            $state.go('todos');
          }
        }
      }).catch(function (error) {
        $log.debug('Error from login ', error);
      });
    };

  });
