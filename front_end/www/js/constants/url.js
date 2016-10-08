'use strict';

angular.module('TeachMeLah').constant('URL', (function () {
    var BASE_URL = 'http://localhost:8000';
    var API_URL = BASE_URL + '/api';

    return {
        BASE_URL: BASE_URL,
        API_URL: API_URL,
        LOGIN_URL: API_URL + '/login',
        REGISTER_URL: API_URL + '/register',
        MAJOR_LIST_URL: API_URL + '/major',
        COURSE_LIST_URL: API_URL + '/course',
        TUTOR_DETAILS_URL: API_URL + '/tutor/details',
        REQUEST_LIST_TUTOR_URL: API_URL + '/getListRequestTutor',
        CANCEL_TUTOR: API_URL+"/cancelTutor",
        CREATE_REQUEST_URL: API_URL + '/addRequest',
        REQUEST_TOKEN: API_URL+"/clientToken",
        CREATE_TRANSACTION : API_URL+"/createTranasaction",
        CHAT_HISTORY_URL: API_URL + '/chat/messages'
    };


})());
