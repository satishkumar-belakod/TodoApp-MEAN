'use strict';

/**
 * @ngdoc function
 * @name todoApp.controller:TodosCtrl
 * @description
 * # TodosCtrladdTodo
 * Controller of the todoApp
 */
angular.module('todoApp')
  .controller('TodosCtrl', function ($scope,$log,$state,todoService,$timeout) {
    $log.debug('In todos controller');
    $scope.newTask = '';

    let token = localStorage.getItem('token');
    if(token){
      todoService.getTodos(token).then(function (response) {
        $log.debug('In success ', response);
        if(response.status === 200){
          if(response.data.todos.length > 0){
            $scope.user_todos = response.data.todos
          }else{
            $scope.user_todos = [];
          }
        }else{
          $scope.user_todos = [];
        }
      }).catch(function (error) {
        $scope.user_todos = [];
        $log.debug('In error ',error);
      });
    }else{
      $state.go('login')
    }


    $scope.addTodo = function () {
      $log.debug('Add Todo ',$scope.newTask);
      var data = {
        'text' : $scope.newTask,
        'token' : token
      };
      todoService.addTodo(data).then(function (response) {
        $scope.newTask = '';
        $log.debug('Response ', response);
        if(response.status === 200){
          $scope.user_todos.push(response.data);
        }
      }).catch(function (error) {
        $log.debug('Error ', error);
      });

    };

    $scope.deleteTodo = function(todo_data){
      var data = {
        id: todo_data._id,
        token: token
      };
      todoService.deleteTodo(data).then(function (response) {
        $log.debug('Response ', response);
        if(response.status === 200){
          $scope.user_todos = $scope.user_todos.filter(function (todo) {
            $log.debug('In filter ', todo);
            if(data.id !== todo._id){
              $log.debug('In if')
              return todo;
            }
          });
        }
      }).catch(function (error) {
        $log.debug('Error ', error);
      });
    };

    $scope.completeTodo = function (todo_data) {
      $log.debug('In completeTodo ', todo_data);
      todoService.completeTodo(todo_data,localStorage.getItem('token')).then(function (response) {
        $log.debug('Complete Todo response ', response);
        if(response.status === 200){
          for(let i=0; i<$scope.user_todos.length;i++){
            $log.debug('In for loop ', i,' ',$scope.user_todos[i]);
            if($scope.user_todos[i]._id === response.data.todo._id){
              $log.debug('In if');
              $scope.user_todos.splice(i,1,response.data.todo);
            }
          }

        }
      }).catch(function (error) {
        $log.debug('Complete Todo error ', error);
      })
    };

    $scope.logoutUser = function () {
      $log.debug('Logout User');
      todoService.deleteToken(localStorage.getItem('token')).then(function (response) {
        $log.debug('logout User response ', response);
        if(response.status === 200){
          localStorage.setItem('token','');
          $state.go('login');
        }
      }).catch(function (error) {
        $log.debug('Error ', error);
      });
    };

  });
