'use strict';

angular.module('TeachMeLah').controller('TuteeTutorDetailsController', function ($state, $stateParams, $http, URL) {
    var vm = this;
    vm.tutorDetails = null;

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
    vm.goToRequestPage = function () {
        $state.go('tuteeRequestPage', {
            tutorEmail: $stateParams.tutorEmail
        });
    };
});