'use strict';

angular.module('TeachMeLah').constant('URL', (function () {
    var BASE_URL = 'http://localhost:8000';
    return {
        BASE_URL: BASE_URL,
        LOGIN_URL: BASE_URL + '/login'
    };
})());