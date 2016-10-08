'use strict';

angular.module('TeachMeLah').controller('LoginController', function ($http, URL, $state) {
    var vm = this;
    vm.user = {};

    vm.loginUser = function () {
        var email = vm.user.email;
        var password = vm.user.password;
        var httpOptions = {
            method: 'POST',
            url: URL.LOGIN_URL,
            data: {
                email: email,
                password: password
            }
        };

        // For testing
        $state.go('tuteeHome.tuteeMajorList');
        return;


        $http(httpOptions).then(function success (response) {
            var userType = response.data.type;
            localStorage.setItem('userDetails', { email: email });

            if (userType === 'tutor') {
                $state.go('tutorHome');
            } else {
                $state.go('tuteeHome.tuteeMajorList');
            }
        }, function error (response) {
            console.log(response);
        });
    };
});