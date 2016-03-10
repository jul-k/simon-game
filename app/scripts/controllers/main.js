'use strict';

/**
 * @ngdoc function
 * @name simonGameApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the simonGameApp
 */
var app = angular.module('simonGameApp');

app.controller('MainCtrl', ['$scope', function ($scope) {
    $scope.numberOfSteps = 0;
    $scope.startBtn = 'ON';
}]);
