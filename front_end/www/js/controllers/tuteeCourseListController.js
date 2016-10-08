'use strict';

angular.module('TeachMeLah').controller('TuteeCourseListController', function ($state, $stateParams, $http, URL) {
    var vm = this;
    vm.courseList = null;

    function getCourseListByMajor() {
        var httpOptions = {
            method: 'POST',
            url: URL.COURSE_LIST_URL,
            data: {
                majorName: $stateParams.majorName
            }
        };

        $http(httpOptions).then(function success (response) {
            vm.courseList = response.data.courseList;
            console.log(vm.courseList);
        }, function error (response) {
            console.log(response);
        });
    }

    getCourseListByMajor();

    vm.goToTutorList = function (courseName, majorName) {
        $state.go('tuteeHome.tuteeTutorList', {
            majorName: majorName,
            courseName: courseName
        });
    };
});