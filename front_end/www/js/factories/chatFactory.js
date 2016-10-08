'use strict';

angular.module('TeachMeLah').factory('ChatFactory', function ($rootScope, MySocketFactory, $timeout) {
    var socket;
    return {
        init: init,
        sendMessage: sendMessage
    };

    function init () {
        socket = MySocketFactory.createSocket();
        socket.emit('hi', JSON.parse(localStorage.getItem('userDetails')).email);
        socket.on('new_message', function (message) {
            $timeout(function () {
                $rootScope.$broadcast('chat_new_message', JSON.parse(message));
            }, 0);
        });

        socket.on('disconnect', function () {
            socket.emit('hi', JSON.parse(localStorage.getItem('userDetails')).email);
        });

        socket.on('connection', function () {
            console.log('CONNECTED');
        });
    }

    function sendMessage (messageObject) {
        socket.emit('new_message', JSON.stringify(messageObject));
    }
});