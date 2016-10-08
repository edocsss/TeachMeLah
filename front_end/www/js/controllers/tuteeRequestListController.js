'use strict';

angular.module('TeachMeLah').controller('TuteeMajorListController', function ($state, $http, URL) {
    var vm = this;
    vm.majorList = null;

    function getRequestList() {
        var httpOptions = {
            method: 'GET',
            url: URL.MAJOR_LIST_URL
        };

        $http(httpOptions).then(function success (response) {
            vm.majorList = response.data.majorList;
            console.log(vm.majorList);
        }, function error (response) {
            console.log(response);
        });
    }

    getMajorList();
});