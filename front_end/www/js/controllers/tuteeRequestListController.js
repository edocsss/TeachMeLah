'use strict';

angular.module('TeachMeLah').controller('TuteeRequestListController', function ($scope,$state, $http, URL) {
    var vm = this;
    $scope.requestList = null;
    $scope.requestAccepted = [];
    $scope.requestUnAccepted = [];

    $scope.goToRequestDetails = function (requestId) {
      $state.go('tuteeRequestDetails', {
        requestId: requestId
      })
    };

    function getRequestList() {
      //TUTEE WILL GET LIST OF TUTOR
      //just for testsing
      localStorage.setItem("userDetails",JSON.stringify({"email":"sujono@gmail.com"}));
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
      console.log("requestList",vm.requestList);
      for(var i = 0 ; i < vm.requestList.length ; i++){
        var obj = vm.requestList[i];
        //need to divide the accepted and unaccepted
        console.log("accepted",obj.accepted);
        var profilePictureSrc = "../../img/profile_pictures/";
        obj.img = profilePictureSrc+Math.floor(Math.random()*3+2)+".png";
        if(obj.accepted == false){
          $scope.requestUnAccepted.push(obj);
        }else{
          $scope.requestAccepted.push(obj);
        }
      }
      console.log("requestAccepted",$scope.requestAccepted);
      console.log("requestUnAccepted",$scope.requestUnAccepted);
    }, function error (response) {
      console.log(response);
    });
  }


  getRequestList();

  $scope.cancellingRequestToTutor= function(item){
    deleteFromList(item,$scope.requestUnAccepted );
  };


  $scope.payTutor = function(item){
    //state go to payment
    $state.go("payment",{
      price: item.price
    });
    //then delete it from the list
    deleteFromList(item,$scope.requestAccepted);
  };

  function deleteFromList(item,arrayPassed){
    var removeIndex = -1;
    for(var i = 0 ; i < arrayPassed.length ; i++){
      if(JSON.stringify(arrayPassed[i]) == JSON.stringify(item)){
        removeIndex = i;
        break;
      }
    }
    console.log("remove Index",removeIndex);
    arrayPassed.splice(removeIndex,1);
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
  }

});
