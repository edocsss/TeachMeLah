'use strict';

angular.module('TeachMeLah').controller('LoginController', function ($http, URL, $state) {
    var vm = this;
    vm.user = {};

    vm.goToEdwin = function () {
        $state.go('chatRoom', {
            senderEmail: 'edwin.candinegara@gmail.com',
            receiverEmail: 'edocsss@gmail.com'
        });
    };

    vm.goToEdocsss = function () {
        $state.go('chatRoom', {
            senderEmail: 'edocsss@gmail.com',
            receiverEmail: 'edwin.candinegara@gmail.com'
        });
    };

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

        $http(httpOptions).then(function success (response) {
            var userType = response.data.type;
            localStorage.setItem('userDetails', JSON.stringify({ email: email }));

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
