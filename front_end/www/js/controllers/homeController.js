'use strict';

angular.module('TeachMeLah').controller('HomeController', function ($state) {
    var vm = this;

    vm.goToLogin = function () {
        $state.go('login');
    };

    vm.goToRegister = function () {
        $state.go('register');
    };
});