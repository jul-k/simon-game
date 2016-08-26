'use strict';

/**
 * @ngdoc function
 * @name simonGameApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the simonGameApp
 */
var app = angular.module('simonGameApp');

app.controller('MainCtrl', ['$scope', '$timeout', function ($scope, $timeout) {
    $scope.numberOfSteps = 0;
    $scope.startBtn = 'ON';
    $scope.gameSteps = [];
    $scope.startCommand = false;
    $scope.sectors = [
        {class:'green', sound: "audio-green"},
        {class:'red', sound: "audio-red"},
        {class:'blue', sound: "audio-blue"},
        {class:'yellow', sound: "audio-yellow"}
    ];
    $scope.playerList = [];
    $scope.robotList =[];

    $scope.startFn = function () {
        if ($scope.startBtn === 'ON') {
            $scope.startBtn = 'OFF';
        } else {
            $scope.startBtn = 'ON';
        }
    };

    $scope.soundFor = function(color) {
        for (var i = 0; i < $scope.sectors.length; i++) {
            if ($scope.sectors[i]['class'] == color){
                return $scope.sectors[i]['sound']
            }
        }
    };

    $scope.Action = function (color) {
        var soundId = $scope.soundFor(color)
        var audio = document.getElementById(soundId);
        audio.play();
        var elem =  document.getElementsByClassName(color)
        var elem = angular.element(elem);
        elem.css('opacity', '0.8');
        $timeout(function() {
            elem.css('opacity', '1');
        }, 500);
    };

    $scope.startGame = function() {
        var colors = ['red', 'green', 'blue', 'yellow'];
        var color = colors[Math.floor(Math.random() * colors.length)];
        $scope.robotList.push(color);
        return $scope.Action(color);
    };

    $scope.clickedSection = function (color) {
        $scope.playerList.push(color);
        $scope.Action(color);
    };

}]);
