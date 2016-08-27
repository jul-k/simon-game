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
    $scope.restartBtn = "start";
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

    $scope.restartFn = function () {
        if ($scope.restartBtn === 'start') {
            $scope.restartBtn = 'restart';
        } else {
            $scope.restartBtn = 'start';
        }
    };

    $scope.soundFor = function(color) {
        for (var i = 0; i < $scope.sectors.length; i++) {
            if ($scope.sectors[i]['class'] === color){
                return $scope.sectors[i].sound;
            }
        }
    };

    $scope.Action = function (color) {
        var soundId = $scope.soundFor(color);
        var audio = document.getElementById(soundId);
        audio.play();
        var elem =  document.getElementsByClassName(color);
        var elem = angular.element(elem);
        elem.css('opacity', '0.8');
        $timeout(function() {
            elem.css('opacity', '1');
        }, 500);
    };

    $scope.getRandColor = function (colorsHistory) {
        var colors = ['red', 'green', 'blue', 'yellow'];
        var color = colors[Math.floor(Math.random() * colors.length)];
        if (colorsHistory[-2] === color && colorsHistory[-1] === color) {
            return $scope.getRandColor(colorsHistory);
        }
        return color;
    };

    $scope.startGame = function() {
        var color = $scope.getRandColor($scope.robotList);
        $scope.robotList.push(color);
        $scope.numberOfSteps++;
        function delay(i) {
            return function () {
                var savedColor = $scope.robotList[i];
                $scope.Action(savedColor);
            };

        }
        for (var i = 0; i < $scope.robotList.length; i++) {
            $timeout(delay(i), 800 * i);
        }
    };

    $scope.clickedSection = function (color) {
        $scope.playerList.push(color);
        $scope.Action(color);
    };

    $scope.$watch('playerList', function(){
        var errorPlay = document.getElementById("errorSound");
        if ($scope.playerList.length>0) {
            var playerListLength = $scope.playerList.length;
            var playerListSliced = $scope.playerList.slice(0,playerListLength);
            var robotListSliced = $scope.robotList.slice(0,playerListLength);
            if (_.isEqual(playerListSliced, robotListSliced)) {
                if (_.isEqual($scope.playerList, $scope.robotList)) {
                    $scope.playerList = [];
                    $timeout($scope.startGame, 1500);
                }
            } else {
                errorPlay.play();
                $scope.playerList = [];
                $scope.robotList = [];
                $scope.numberOfSteps = 0;
                $scope.restartBtn = 'start';
            }
        }
    }, true);

}]);
