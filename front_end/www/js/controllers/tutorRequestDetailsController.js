'use strict';

angular.module('TeachMeLah').controller('TutorRequestDetailsController', function ($state, $stateParams, $http, URL, $rootScope) {
    var vm = this;
    var requestId = $stateParams.requestId;

    vm.requestDetails = null;
    vm.tuteeDetails = null;

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
            var httpOptions = {
                method: 'POST',
                url: URL.TUTOR_DETAILS_URL,
                data: {
                    tutorEmail: response.data.participants.emailTutee
                }
            };

            vm.requestDetails = response.data;
            $http(httpOptions).then(function success (response) {
                console.log(response.data);
                vm.tuteeDetails = response.data.tutorDetails;
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
            senderEmail: vm.requestDetails.participants.emailTutor,
            receiverEmail: vm.requestDetails.participants.emailTutee
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
            if (goBack) {
                $state.go('tutorHome');
                $rootScope.teachmelah.refreshTutorRequestList = true;
            }
        }, function error (response) {
            console.log(response);
        });
    };

    vm.acceptBooking = function () {
        var httpOptions = {
          method: 'POST',
          url: URL.UPDATE_REQUEST_TUTOR,
          data: {
            _id: requestId
          }
        };

        $http(httpOptions).then(function success (response) {
          vm.requestList = response.data;
          console.log(response);
          if (response.status == 200) {
            console.log("it is updated");
            $state.go('tutorHome');
            $rootScope.teachmelah.refreshTutorRequestList = true;
          }
        }, function error (response) {
          console.log(response);
        });
    };
});