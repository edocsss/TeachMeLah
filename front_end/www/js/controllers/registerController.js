'use strict';

angular.module('TeachMeLah').controller('RegisterController', function () {
    var vm = this;
    var profpicURLs = [
        'images/profile_pictures/1.png',
        'images/profile_pictures/2.png',
        'images/profile_pictures/3.png',
        'images/profile_pictures/4.png',
        'images/profile_pictures/5.png'
    ];

    function getRandomProfpicURL () {
        var randomIndex = Math.floor(Math.random() * profpicURLs.length);
        return profpicURLs[randomIndex];
    }

    vm.newUser = {
        type: 'tutor',
        availability: {}
    };

    vm.registerUser = function () {
        var userProfile = {
            name: vm.newUser.fullName,
            email: vm.newUser.email,
            contact: vm.newUser.phone,
            type: vm.newUser.type,
            profpicURL: getRandomProfpicURL(),
            tagline: vm.newUser.type === 'tourguide' ? vm.newUser.tagline : null,
            description: vm.newUser.description === 'tourguide' ? vm.newUser.description : null,
            location: vm.newUser.type === 'tourguide' ? vm.newUser.location.toLowerCase() : null,
            price: vm.newUser.type === 'tourguide' ? vm.newUser.price : null,
            availability: vm.newUser.type === 'tourguide' ? vm.newUser.availability.end : null
        };
    };
});