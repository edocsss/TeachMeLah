'use strict';

angular.module('TeachMeLah').controller('TuteeNewRequestController', function ($state, $stateParams, $http, URL) {
    var vm = this;
    vm.tutorDetails = null;
    vm.requestDetails = {
        date: null,
        startTime: null,
        endTime: null
    };

    function getTutorDetails() {
        var httpOptions = {
            method: 'POST',
            url: URL.TUTOR_DETAILS_URL,
            data: {
                tutorEmail: $stateParams.tutorEmail
            }
        };

        $http(httpOptions).then(function success (response) {
            vm.tutorDetails = response.data.tutorDetails;
            console.log(vm.tutorDetails);
        }, function error (response) {
            console.log(response);
        });
    }

    getTutorDetails();

    function getTimeFromFilterDateString(dateString) {
        var timestamp = Date.parse(dateString);
        var date = new Date(timestamp);
        return date.getHours() + ':' + date.getMinutes();
    }

    vm.getTotalCost = function () {
        if (!vm.requestDetails.startTime || !vm.requestDetails.endTime) {
            return 0;
        }

        var requestStartTime = getTimeFromFilterDateString(vm.requestDetails.startTime);
        var requestEndTime = getTimeFromFilterDateString(vm.requestDetails.endTime);

        var requestStartTimeSplit = requestStartTime.split(':');
        var requestEndTimeSplit = requestEndTime.split(':');

        var requestStartTimeHour = parseInt(requestStartTimeSplit[0]);
        var requestStartTimeMinutes = parseInt(requestStartTimeSplit[1]);
        var requestEndTimeHour = parseInt(requestEndTimeSplit[0]);
        var requestEndTimeMinutes = parseInt(requestEndTimeSplit[1]);

        var diffHour = requestEndTimeHour - requestStartTimeHour;
        if (requestStartTimeMinutes >= requestEndTimeMinutes) {
            return diffHour * vm.tutorDetails.hourlyRate;
        } else {
            return (diffHour + 1) * vm.tutorDetails.hourlyRate;
        }
    };
});