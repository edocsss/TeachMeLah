'use strict';

angular.module('TeachMeLah').controller('TuteeTutorListController', function ($scope, $state, $stateParams, $http, URL) {
    var vm = this;
    vm.tutorList = [];
    vm.filteredTutorList = [];

    vm.courseName = $stateParams.courseName;
    vm.filter = {
        date: null,
        startTime: null,
        endTime: null,
        hourlyRate: 50
    };

    vm.dayList = [
        'day',
        'monday',
        'tuesday',
        'wednesday',
        'thursday',
        'friday',
        'saturday',
        'sunday'
    ];

    function getTutorListByMajor() {
        var httpOptions = {
            method: 'POST',
            url: URL.TUTOR_LIST_URL,
            data: {
                majorName: $stateParams.majorName,
                courseName: $stateParams.courseName
            }
        };

        $http(httpOptions).then(function success (response) {
            vm.tutorList = response.data.tutorList;
            vm.filteredTutorList = vm.tutorList;
            console.log(vm.tutorList);
        }, function error (response) {
            console.log(response);
        });
    }

    getTutorListByMajor();
    vm.goToTutorDetails = function (tutorEmail) {
        $state.go('tuteeTutorDetails', {
            tutorEmail: tutorEmail,
            courseName: $stateParams.courseName
        });
    };

    function getDayFromDateString(dateString) {
        var DAYS = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
        var timestamp = Date.parse(dateString);
        return DAYS[(new Date(timestamp)).getDay()];
    }

    function getTimeFromFilterDateString(dateString) {
        var timestamp = Date.parse(dateString);
        var date = new Date(timestamp);
        return date.getHours() + ':' + date.getMinutes();
    }

    function getTimeFromString(dateString) {
        var time = dateString.split('T')[1];
        var hour = time.split(':')[0];
        var minutes = time.split(':')[1];

        return hour + ':' + minutes;
    }

    function compareTime(filterTime, tutorTime) {
        var filterTimeSplit = filterTime.split(':');
        var tutorTimeSplit = tutorTime.split(':');

        var filterTimeHour = parseInt(filterTimeSplit[0]);
        var filterTimeMinutes = parseInt(filterTimeSplit[1]);

        var tutorTimeHour = parseInt(tutorTimeSplit[0]);
        var tutorTimeMinutes = parseInt(tutorTimeSplit[1]);

        if (filterTimeHour < tutorTimeHour) {
            return -1;
        } else if (filterTimeHour > tutorTimeHour) {
            return 1;
        } else {
            if (filterTimeMinutes < tutorTimeMinutes) {
                return -1;
            } else if (filterTimeMinutes > tutorTimeMinutes) {
                return 1;
            } else {
                return 0;
            }
        }
    }

    vm.filterTutor = function (tutor) {
        var filterDay = getDayFromDateString(vm.filter.date);
        var day = tutor.schedule.day;

        var filterStartTime = getTimeFromFilterDateString(vm.filter.startTime);
        var startTime = getTimeFromString(tutor.schedule.start);
        var filterEndTime = getTimeFromFilterDateString(vm.filter.endTime);
        var endTime = getTimeFromString(tutor.schedule.end);

        var hourlyRate = tutor.hourlyRate;
        var result = true;

        if (vm.filter.startTime && vm.filter.endTime) {
            var compareStartTime = compareTime(filterStartTime, startTime);
            var compareEndTime = compareTime(filterEndTime, endTime);
        }

        if (!vm.filter.startTime || !vm.filter.endTime || !vm.filter.date) {
            if (parseInt(hourlyRate) <= parseInt(vm.filter.hourlyRate)) {
                result = true;
            } else {
                result = false;
            }
        } else {
            if (filterDay === day
                && (compareStartTime === -1 || compareStartTime === 0)
                && (compareEndTime === 1 || compareEndTime === 0)
                && parseInt(hourlyRate) <= parseInt(vm.filter.hourlyRate)) {
                result = true;
            } else {
                result = false;
            }
        }

        return result;
    };

    vm.getCurrentFilteredTutorList = function () {
        return vm.tutorList.filter(vm.filterTutor);
    };

    $scope.$watchCollection('tuteeTutorListController.filter', function () {
        vm.filteredTutorList = vm.tutorList.filter(vm.filterTutor);
    });
});