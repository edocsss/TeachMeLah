'use strict';

angular.module('TeachMeLah').controller('TuteeRequestDetailsController', function ($state, $stateParams, $http, URL) {
    var vm = this;
    var requestId = $stateParams.requestId;

    vm.requestDetails = null;
    vm.tutorDetails = null;

    getRequestDetails();
    function getRequestDetails() {
        var httpOptions = {
            method: 'POST',
            url: URL.REQUEST_DETAILS_URL,
            data: {
                requestId: requestId
            }
        };

        $http(httpOptions).then(function success (response) {
            console.log(response.data);
            var httpOptions = {
                method: 'POST',
                url: URL.TUTOR_DETAILS_URL,
                data: {
                    tutorEmail: response.data.participants.emailTutor
                }
            };

            vm.requestDetails = response.data;
            $http(httpOptions).then(function success (response) {
                console.log(response.data);
                vm.tutorDetails = response.data.tutorDetails;
            }, function error () {
                console.log(response);
            })
        }, function error (response) {
            console.log(response);
        })
    }

    vm.processTime = function (time) {
        if (!time) return;
        time = time.split('T')[1].split(':');
        return time[0] + ':' + time[1];
    };

    vm.goToChatRoom = function () {
        $state.go('chatRoom', {
            senderEmail: vm.requestDetails.participants.emailTutee,
            receiverEmail: vm.requestDetails.participants.emailTutor
        });
    };

    vm.deleteBooking = function (goBack) {
        var httpOptions = {
            method: 'POST',
            url: URL.CANCEL_TUTOR,
            data: {
                _id: requestId
            }
        };

        $http(httpOptions).then(function success (response) {
            vm.requestList = response.data;
            if (goBack) $state.go('tuteeHome.requestList');
        }, function error (response) {
            console.log(response);
        });
    };

    vm.finishBooking = function () {
        $state.go("payment");
        vm.deleteBooking(false);
    };
});