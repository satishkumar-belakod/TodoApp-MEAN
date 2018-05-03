'use strict';

/**
 * @ngdoc service
 * @name todoApp.todoService
 * @description
 * # todoService
 * Service in the todoApp.
 */
angular.module('todoApp')
  .service('todoService', function ($http,$log) {
    // AngularJS will instantiate a singleton by calling "new" on this function

    var back_end_url = 'http://localhost:3000/'

    var register = function (data) {
      return $http({
        method: 'POST',
        url: back_end_url + 'users',
        data:data,
        headers: {
          'x-auth': null
        },
      }).then(function (response) {
        return response;
      }).catch(function (error) {
        return error;
      });
    };

    var login = function (data) {
      return $http({
        method: 'POST',
        url : `${back_end_url}users/login`,
        data: data,
        headers: {
          'x-auth' : null
        }
      }).then(function (response) {
        return response;
      }).catch(function (error) {
        return error;
      });
    };

    var getTodos = function (data) {
      return $http({
        method: 'GET',
        url: back_end_url + 'todos',
        headers: {
          'x-auth': data,
        },
      }).then(function (response) {
        return response;
      }).catch(function (error) {
        return error;
      });
    };

    var deleteTodo = function (data) {
      return $http({
        method : 'DELETE',
        url : `${back_end_url}todos/${data.id}`,
        headers: {
          'x-auth': data.token,
        },
      });
    };

    var addTodo = function (data) {
      return $http({
        method: 'POST',
        url: back_end_url + 'todos',
        data:data,
        headers: {
          'x-auth': data.token,
        },
      }).then(function (response) {
        return response;
      }).catch(function (error) {
        return error;
      });
    };

    var completeTodo = function (todoData,token) {
      var data = {
        'text' : todoData.text,
        'completed' : true
      }
      return $http({
        method: 'PATCH',
        url: `${back_end_url}todos/${todoData._id}`,
        headers: {
          'x-auth' : token
        },
        data: data
      }).then(function (response) {
        return response;
      }).catch(function (error) {
        return error;
      });
    };

    var deleteToken = function (token) {
      return $http({
        method : 'DELETE',
        url : `${back_end_url}users/me/token`,
        headers:{
          'x-auth' : token
        }
      }).then(function (response) {
        return response
      }).catch(function (error) {
        return error;
      });
    };


    return{
      register : register,
      getTodos : getTodos,
      deleteTodo : deleteTodo,
      addTodo : addTodo,
      completeTodo : completeTodo,
      deleteToken : deleteToken,
      login : login
    };
  });
