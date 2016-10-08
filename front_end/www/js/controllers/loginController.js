'use strict';

angular.module('TeachMeLah').controller('LoginController', function ($http, URL) {
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

        $http(httpOptions).then(function success (response) {
            localStorage.setItem('userDetails', { email: email });
        }, function error (response) {
            console.log(response);
        });
    };
});