'use strict';

/**
 * @ngdoc overview
 * @name simonGameApp
 * @description
 * # simonGameApp
 *
 * Main module of the application.
 */
angular
  .module('simonGameApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
