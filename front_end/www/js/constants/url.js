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
        TUTOR_LIST_URL: API_URL + '/tutor',
        TUTOR_DETAILS_URL: API_URL + '/tutor/details',
        REQUEST_LIST_TUTOR_URL: API_URL + '/getListRequestTutor',
        CANCEL_TUTOR: API_URL+"/cancelTutor"
    };
})());
