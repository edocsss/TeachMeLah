'use strict';

angular.module('TeachMeLah').controller('ChatController', function($scope, $stateParams, $ionicFrostedDelegate, $ionicScrollDelegate, $rootScope) {
    var loggedInUserEmail = JSON.parse(localStorage.getItem('userDetails')).email;
    $scope.messages = [];
    $scope.message = '';

    $scope.addMessage = function () {
        $scope.messages.push({
            email: loggedInUserEmail,
            content: message
        });

        // Send to websocket here
        // ws.send()

        $ionicFrostedDelegate.update();
        $ionicScrollDelegate.scrollBottom(true);
    };

    function getChatMessageHistory() {
        var httpOptions = {
            data: {
                tutorEmail: $stateParams.tutorEmail,
                tuteeEmail: tuteeEmail
            }
        };
    }
});