'use strict';

angular.module('TeachMeLah').factory('MySocketFactory', function (socketFactory) {
    return {
        createSocket: function () {
            return socketFactory({
                ioSocket: io.connect('ws://localhost:8000')
            });
        }
    };
});