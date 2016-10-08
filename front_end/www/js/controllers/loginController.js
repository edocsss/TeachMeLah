'use strict';

angular.module('TeachMeLah').controller('LoginController', function ($http) {
    var vm = this;
    vm.user = {};

    vm.loginUser = function () {
        var email = vm.user.email;
        var password = vm.user.password;
        var httpOptions = {
            method: 'POST',
            url: 'http://localhost:5000',
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