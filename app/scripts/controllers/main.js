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
    $scope.restartBtn = "start";
    $scope.strictMode = false;
    $scope.startCommand = false;
    $scope.blocked = false;
    $scope.sectors = [
        {class:'green', sound: "audio-green"},
        {class:'red', sound: "audio-red"},
        {class:'blue', sound: "audio-blue"},
        {class:'yellow', sound: "audio-yellow"}
    ];
    $scope.playerList = [];
    $scope.robotList =[];

    $scope.restartFn = function () {
        if ($scope.restartBtn === 'start') {
            $scope.restartBtn = 'restart';
        } else {
            $scope.restartBtn = 'start';
            $scope.restartGame();
        }
    };

    $scope.restartGame = function() {
        $scope.robotList = [];
        $scope.playerList = [];
        $scope.numberOfSteps = 0;
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

    $scope.playExistRoboSounds = function () {
        function delay(i) {
            return function () {
                var savedColor = $scope.robotList[i];
                $scope.Action(savedColor);
            };

        }
        $scope.blocked = true;
        for (var i = 0; i < $scope.robotList.length; i++) {
            $timeout(delay(i), 800 * i);
        }
        $timeout(function() {
            $scope.blocked = false;
        }, 800 * i);
    };

    $scope.startGame = function() {
        var color = $scope.getRandColor($scope.robotList);
        $scope.robotList.push(color);
        $scope.numberOfSteps++;
        $scope.playExistRoboSounds();
    };

    $scope.clickedSection = function (color) {
        if ($scope.blocked){
            return;
        }
        if ($scope.restartBtn === 'restart') {
            $scope.playerList.push(color);
            $scope.Action(color);
        } else {
            return;
        }
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
                if (!$scope.strictMode) {
                    errorPlay.play();
                    notie.alert(3, "Ooops... Try again!", 2);
                    $scope.playerList = [];
                    $timeout($scope.playExistRoboSounds, 3000);
                } else {
                    errorPlay.play();
                    notie.alert(3, "Game Over", 2);
                    $scope.playerList = [];
                    $scope.robotList = [];
                    $scope.numberOfSteps = 0;
                    $scope.restartBtn = 'start';
                }
            }
        }
    }, true);

    $scope.$watch('numberOfSteps', function() {
        var disablThis = document.getElementById("strict");
        if ($scope.numberOfSteps > 0) {
            disablThis.setAttribute("disabled", true);
        } else {
            disablThis.removeAttribute("disabled", false);
        }
        if ($scope.numberOfSteps === 6) {
            document.getElementById("victorySound").play();
            notie.alert(1, "Victory!!!", 2);
            $scope.restartFn();
        }
    });

}]);
