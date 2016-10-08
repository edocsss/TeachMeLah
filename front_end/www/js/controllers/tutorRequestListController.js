'use strict';

angular.module('TeachMeLah').controller('TutorRequestListController', function ($scope,$state, $http, URL) {
  var vm = this;
  $scope.requestList = null;
  $scope.requestAccepted = [];
  $scope.requestUnAccepted = [];

  function getRequestList() {
    //TUTEE WILL GET LIST OF TUTOR
    //just for testsing
    $scope.requestList = null;
    $scope.requestAccepted = [];
    $scope.requestUnAccepted = [];
    var user = {'email':'sujono@gmail.com'};
    localStorage.setItem('userDetails', JSON.stringify(user));
    var emailUser = JSON.parse(localStorage.getItem("userDetails"));
    console.log(emailUser.email);
    var httpOptions = {
      method: 'POST',
      url: URL.REQUEST_LIST_TUTEE_URL,
      data: {
        emailTutor: emailUser.email
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

  $scope.cancellingRequestToTutee= function(item){
    deleteFromList(item,$scope.requestUnAccepted );
  };
  $scope.deleteFromAccepted  = function(item){
    deleteFromList(item, $scope.requestAccepted);
  };


  $scope.acceptRequestToTutee = function(item){
    var httpOptions = {
      method: 'POST',
      url: URL.UPDATE_REQUEST_TUTOR,
      data: item
    };
    $http(httpOptions).then(function success (response) {
      vm.requestList = response.data;
      getRequestList();
      if(response.statusCode == 200){
        console.log("it is updated");
      }
    }, function error (response) {
      console.log(response);
    });

  };
  function deleteBufferFromList(item,arrayPassed){
    var removeIndex = -1;
    for(var i = 0 ; i < arrayPassed.length ; i++){
      if(JSON.stringify(arrayPassed[i]) == JSON.stringify(item)){
        removeIndex = i;
        break;
      }
    }
    console.log("remove Index",removeIndex);
    arrayPassed.splice(removeIndex,1);
  }

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





