'use strict';

angular.module('TeachMeLah').controller('TuteeRequestListController', function ($scope,$state, $http, URL) {
    var vm = this;
    $scope.requestList = null;
    $scope.requestAccepted = [];
    $scope.requestUnAccepted = [];

    function getRequestList() {
      //TUTEE WILL GET LIST OF TUTOR
      //just for testsing
      var emailUser = JSON.parse(localStorage.getItem("userDetails"));
      var httpOptions = {
        method: 'POST',
        url: URL.REQUEST_LIST_TUTOR_URL,
        data: {
          emailTutee: emailUser.email
        }
      };

        $http(httpOptions).then(function success (response) {
          vm.requestList = response.data;
          console.log("requestList", vm.requestList);

          for (var i = 0 ; i < vm.requestList.length ; i++) {
            var obj = vm.requestList[i];
            var profilePictureSrc = "../../img/profile_pictures/";
            obj.img = profilePictureSrc + Math.floor(Math.random() * 3 + 2) + ".png";

            if (obj.accepted == false) {
              $scope.requestUnAccepted.push(obj);
            } else {
              $scope.requestAccepted.push(obj);
            }
          }

          console.log("requestAccepted",$scope.requestAccepted);
          console.log("requestUnAccepted",$scope.requestUnAccepted);
        }, function error (response) {
            console.log(response);
        });
    }

   function createPaypalComponent(){
     // Create a client.
     braintree.client.create({
       authorization: CLIENT_AUTHORIZATION
     }, function (clientErr, clientInstance) {
       // Stop if there was a problem creating the client.
       // This could happen if there is a network error or if the authorization
       // is invalid.
       if (clientErr) {
         console.error('Error creating client:', clientErr);
         return;
       }

       // Create a PayPal component.
       braintree.paypal.create({
         client: clientInstance
       }, function (paypalErr, paypalInstance) {

         // Stop if there was a problem creating PayPal.
         // This could happen if there was a network error or if it's incorrectly
         // configured.
         if (paypalErr) {
           console.error('Error creating PayPal:', paypalErr);
           return;
         }

         // Enable the button.
         paypalButton.removeAttribute('disabled');

         // When the button is clicked, attempt to tokenize.
         $scope.payTutor = function (item) {
           // Because tokenization opens a popup, this has to be called as a result of
           // customer action, like clicking a button—you cannot call this at any time.
           paypalInstance.tokenize({
             flow: 'vault'
           }, function (tokenizeErr, payload) {
             // Stop if there was an error.
             if (tokenizeErr) {
               if (tokenizeErr.type !== 'CUSTOMER') {
                 console.error('Error tokenizing:', tokenizeErr);
               }
               return;
             }
             // Tokenization succeeded!
             paypalButton.setAttribute('disabled', true);
             console.log('Got a nonce! You should submit this to your server.');
             console.log(payload.nonce);
           });

         };

       });

     });
   }


    getRequestList();
    $scope.cancellingRequestToTutor= function(item){
      var removeIndex = -1;
      for (var i = 0 ; i < $scope.requestUnAccepted.length ; i++) {
        if (JSON.stringify($scope.requestUnAccepted[i]) == JSON.stringify(item)) {
          removeIndex = i;
          break;
        }
      }

      console.log("remove Index",removeIndex);
      $scope.requestUnAccepted.splice(removeIndex,1);

      //create httpPost top delete data
      var httpOptions = {
        method: 'POST',
        url: URL.CANCEL_TUTOR,
        data: item
      };

      $http(httpOptions).then(function success (response) {
        vm.requestList = response.data;
        if(response.statusCode == 200){
          console.log("it is deleted");
        }
      }, function error (response) {
        console.log(response);
      });
    };

    $scope.payTutor = function(item){

    }
});
