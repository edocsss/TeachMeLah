'use strict';

angular.module('TeachMeLah').controller('PaymentController', function ($scope,$state, $stateParams, $http, URL) {
  //request for the token for iniziation
  //create httpPost top delete data

  var tokenGenerate = null;


  var httpOptions = {
    method: 'GET',
    url: URL.REQUEST_TOKEN
  };

  $http(httpOptions).then(function success (response) {
    console.log(response);
    if(response.status == 200){
      console.log("data");
      tokenGenerate  = response.data["clientToken"];
      console.log("it is deleted");
      createTransaction();
    }
  }, function error (response) {
    console.log(response);
  });


  function createTransaction() {
    var form = document.querySelector('#checkout-form');
    var submit = document.querySelector('input[type="submit"]');

    braintree.client.create({
      // Replace this with your own authorization.
      authorization: tokenGenerate }, function (clientErr, clientInstance) {
      if (clientErr) {
        // Handle error in client creation
        return;
      }
      console.log("client is created");
      braintree.hostedFields.create({
        client: clientInstance,
        styles: {
          'input': {
            'font-size': '14pt'
          },
          'input.invalid': {
            'color': 'red'
          },
          'input.valid': {
            'color': 'green'
          }
        },
        fields: {
          number: {
            selector: '#card-number',
            placeholder: '4111 1111 1111 1111'
          },
          cvv: {
            selector: '#cvv',
            placeholder: '123'
          },
          expirationDate: {
            selector: '#expiration-date',
            placeholder: '10/2019'
          }
        }
      }, function (hostedFieldsErr, hostedFieldsInstance) {
        if (hostedFieldsErr) {
          // Handle error in Hosted Fields creation
          return;
        }

        submit.removeAttribute('disabled');

        form.addEventListener('submit', function (event) {
          event.preventDefault();

          hostedFieldsInstance.tokenize(function (tokenizeErr, payload) {
            if (tokenizeErr) {
              // Handle error in Hosted Fields tokenization
              return;
            }
            console.log("payload nonce",payload.nonce);
            console.log("price",$stateParams.price);
            httpOptions = {
              method: 'POST',
              url: URL.CREATE_TRANSACTION,
              data : {"nonce":payload.nonce, "price" : $stateParams.price}
            };

            $http(httpOptions).then(function success (response) {
              alert("payment succedded");
              $state.go('tuteeHome.requestList');
            }, function error (response) {
              console.log(response);
            });

          });
        }, false);
      });
    });
  }



});
