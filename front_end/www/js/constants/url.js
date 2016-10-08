'use strict';

angular.module('TeachMeLah').constant('URL', (function () {
    var BASE_URL = 'http://localhost:8000';
    var API_URL = BASE_URL + '/api';
    return {
        BASE_URL: BASE_URL,
        API_URL: API_URL,
        LOGIN_URL: API_URL + '/login',
        MAJOR_LIST_URL: API_URL + '/major'
    };
})());