'use strict';

angular.module('TeachMeLah').factory('ChatFactory', function ($rootScope, MySocketFactory) {
    var socket;
    return {
        init: init,
        sendMessage: sendMessage
    };

    function init () {
        socket = MySocketFactory.createSocket();
        socket.emit('hi', JSON.parse(localStorage.getItem('userDetails')).email);
        socket.on('new_message', function (message) {
            $rootScope.$broadcast('chat_new_message', JSON.parse(message));
        });
    }

    function sendMessage (messageObject) {
        socket.emit('new_message', JSON.stringify(messageObject));
    }
});