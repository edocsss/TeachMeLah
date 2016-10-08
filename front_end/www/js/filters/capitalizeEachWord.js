'use strict';

angular.module('TeachMeLah').filter('capitalizeEachWord', function () {
    return function (input) {
        var splitted = input.split(' ');
        for (var i in splitted) {
            var word = splitted[i];
            splitted[i] = word[0].toUpperCase() + word.slice(1);
        }

        return splitted.join(' ');
    };
});