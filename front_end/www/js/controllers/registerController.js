'use strict';

angular.module('TeachMeLah').controller('RegisterController', function ($http, URL, $state) {
    var vm = this;
    var profpicURLs = [
        'img/profile_pictures/1.png',
        'img/profile_pictures/2.png',
        'img/profile_pictures/3.png',
        'img/profile_pictures/4.png',
        'img/profile_pictures/5.png'
    ];

    function getRandomProfpicURL () {
        var randomIndex = Math.floor(Math.random() * profpicURLs.length);
        return profpicURLs[randomIndex];
    }

    function getMajorList () {
        var httpOptions = {
            method: 'GET',
            url: URL.MAJOR_LIST_URL
        };

        $http(httpOptions).then(function success (response) {
            vm.majorList = ['please select'];
            vm.majorList = vm.majorList.concat(response.data.majorList.map(function (majorItem) {
                return majorItem.name;
            }));
        }, function error (response) {
            console.log(response);
        });
    }

    getMajorList();
    vm.dayList = [
        'please select',
        'monday',
        'tuesday',
        'wednesday',
        'thursday',
        'friday',
        'saturday',
        'sunday'
    ];

    vm.gpaCategoryList = [
        'please select',
        '< 2.00',
        '2.00 - 2.50',
        '2.50 - 3.00',
        '3.00 - 3.50',
        '3.50 - 4.00',
        '4.00 - 4.50',
        '4.50 - 5.00'
    ];

    vm.newUser = {
        type: 'tutee',
        gpaCategory: 'please select',
        major: 'please select',
        schedule: {
            day: 'please select'
        }
    };

    vm.registerUser = function () {
        var userProfile = {
            name: vm.newUser.fullName,
            email: vm.newUser.email,
            contact: vm.newUser.phone,
            type: vm.newUser.type,
            profpicURL: getRandomProfpicURL(),
            password: vm.newUser.password,
            major: vm.newUser.type === 'tutor' ? vm.newUser.major : null,
            gpaCategory: vm.newUser.type === 'tutor' ? vm.newUser.gpaCategory : null,
            tagline: vm.newUser.type === 'tutor' ? vm.newUser.tagline : null,
            description: vm.newUser.type === 'tutor' ? vm.newUser.description : null,
            hourlyRate: vm.newUser.type === 'tutor' ? vm.newUser.hourlyRate : null,
            schedule: vm.newUser.type === 'tutor' ? vm.newUser.schedule : null
        };

        var httpOptions = {
            method: 'POST',
            url: URL.REGISTER_URL,
            data: userProfile
        }

        $http(httpOptions).then(function success (response) {
            localStorage.setItem('userDetails', JSON.stringify({ email: userProfile.email }));
            if (userProfile.type === 'tutor') {
                $state.go('tutorHome');
            } else {
                $state.go('tuteeHome.tuteeMajorList');
            }
        }, function error (response) {
            console.log(response);
        })
    };
});