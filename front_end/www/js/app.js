// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('TeachMeLah', [
    'ionic',
    'ngWebSocket',
    'ion-datetime-picker'
  ])

  .run(function($ionicPlatform) {
    $ionicPlatform.ready(function() {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        cordova.plugins.Keyboard.disableScroll(true);

      }
      if (window.StatusBar) {
        // org.apache.cordova.statusbar required
        StatusBar.styleDefault();
      }
    });
  })

  .config(function($stateProvider, $urlRouterProvider) {

    // Ionic uses AngularUI Router which uses the concept of states
    // Learn more here: https://github.com/angular-ui/ui-router
    // Set up the various states which the app can be in.
    // Each state's controller can be found in controllers.js
    $stateProvider
    // setup an abstract state for the tabs directive
    .state('home', {
      url: '/',
      templateUrl: 'templates/home.html',
      controller: 'HomeController',
      controllerAs: 'homeController'
    })
    .state('login', {
      url: '/login',
      templateUrl: 'templates/login.html',
      controller: 'LoginController',
      controllerAs: 'loginController'
    })
    .state('register', {
      url: '/register',
      templateUrl: 'templates/register.html',
      controller: 'RegisterController',
      controllerAs: 'registerController'
    })
    .state('tuteeHome', {
      url: '/tutee',
      templateUrl: 'templates/tutee-home-tabs.html',
      abstract: true
    })
    .state('tuteeHome.tuteeMajorList', {
      url: '/tutee/majorList',
      views: {
        'course-list-tab': {
          templateUrl: 'templates/tutee-major-list.html',
          controller: 'TuteeMajorListController',
          controllerAs: 'tuteeMajorListController'
        }
      }
    })
    .state('tuteeHome.tuteeCourseList', {
      url: '/tutee/courseList/:majorName',
      views: {
        'course-list-tab': {
          templateUrl: 'templates/tutee-course-list.html',
          controller: 'TuteeCourseListController',
          controllerAs: 'tuteeCourseListController'
        }
      }
    })
    .state('tuteeHome.tuteeTutorList', {
      url: '/tutee/tutorList/:majorName/:courseName',
      views: {
        'course-list-tab': {
          templateUrl: 'templates/tutee-tutor-list.html',
          controller: 'TuteeTutorListController',
          controllerAs: 'tuteeTutorListController'
        }
      }
    })
    .state('tuteeHome.requestList', {
      url: '/tutee/requestList',
      views: {
        'request-list-tab': {
          templateUrl: 'templates/tutee-request-list.html',
          controller: 'TuteeRequestListController',
          controllerAs: 'tuteeRequestListController'
        }
      }
    });

    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/login');
  });
