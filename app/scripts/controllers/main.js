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

    $scope.startFn = function () {
        if ($scope.startBtn === 'ON') {
            $scope.startBtn = 'OFF';
        } else {
            $scope.startBtn = 'ON';
        }
    };

    $scope.changeColor = function(e) {
        angular.element(e.target).css('opacity', '0.8');
        $timeout(function() {
            angular.element(e.target).css('opacity', '1');
        }, 500);
    };

    $scope.audioGreen = function (e) {
        var audio = document.getElementById("audio-green");
        audio.play();
        $scope.changeColor(e);
    };

    $scope.audioRed = function (e) {
        var audio = document.getElementById("audio-red");
        audio.play();
        $scope.changeColor(e);
    };

    $scope.audioYellow = function (e) {
        var audio = document.getElementById("audio-yellow");
        audio.play();
        $scope.changeColor(e);
    };

    $scope.audioBlue = function (e) {
        var audio = document.getElementById("audio-blue");
        audio.play();
        $scope.changeColor(e);
    };

    $scope.listOfSounds = [$scope.audioGreen,
        $scope.audioRed,
        $scope.audioYellow,
        $scope.audioBlue
    ];

    $scope.startGame = function() {
        if ($scope.startCommand===false) {
            $scope.startCommand = true;
        } else {
            $scope.startCommand = false;
        }
    };

    // if ($scope.startCommand === true) {
    //     for (var i=0; $scope.gameSteps.length<20; i++) {
    //         $scope.gameSteps.push(Math.floor(Math.random()*$scope.listOfSounds.length));
    //     }
    // }
}]);
