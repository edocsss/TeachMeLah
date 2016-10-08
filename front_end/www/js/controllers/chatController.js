'use strict';

angular.module('TeachMeLah').controller('ChatController', function($scope, $stateParams, $ionicFrostedDelegate, $ionicScrollDelegate, $rootScope, ChatFactory, $http, URL) {
    var loggedInUserEmail = JSON.parse(localStorage.getItem('userDetails')).email;
    $scope.messages = [];
    $scope.message = '';
    $scope.receiver = $stateParams.receiverEmail;

    $scope.addMessage = function () {
        $scope.messages.push({
            sender: loggedInUserEmail,
            receiver: $stateParams.receiverEmail,
            content: $scope.message
        });

        // Send to websocket here
        ChatFactory.sendMessage({
            sender: loggedInUserEmail,
            receiver: $stateParams.receiverEmail,
            content: $scope.message
        });

        $ionicFrostedDelegate.update();
        $ionicScrollDelegate.scrollBottom(true);
        $scope.message = '';
    };

    getChatMessageHistory();
    function getChatMessageHistory() {
        var httpOptions = {
            method: 'POST',
            url: URL.CHAT_HISTORY_URL,
            data: {
                receiverEmail: $stateParams.receiverEmail,
                senderEmail: loggedInUserEmail
            }
        };

        $http(httpOptions).then(function success (response) {
            $scope.messages = response.data.chatHistory;
        }, function failure (respose) {
            console.log(response);
        })
    }

    $scope.$on('chat_new_message', function (e, message) {
        if (message.receiver === loggedInUserEmail) {
            $scope.messages.push(message);
            $ionicFrostedDelegate.update();
            $ionicScrollDelegate.scrollBottom(true);
        }
    });
});