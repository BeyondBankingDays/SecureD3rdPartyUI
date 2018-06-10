angular.module('app.confirmationController', [])
  .controller('confirmationController', ['$scope', '$timeout', '$location', '$http', '$window',
    function ($scope, $timeout, $location, $http, $window) {

      $scope.error = false;
      $scope.processed = false;
      let token = $window.sessionStorage.getItem('token');
      let config = {
        'headers': {
          'Content-Type': 'application/json',
          'Authorization': 'DirectLogin token=\"' + token + '\"'
        }
      };

      $http.get('https://beyondbanking.openbankproject.com/obp/v3.0.0/users/current', config).then(
        function (success) {
          let userId = success.data.user_id;
          $http.get('https://webapisecuredbb.azurewebsites.net/user/' + userId + '/documents')
            .then(function (success) {
              $scope.docs = success.data;
            }, function () {
              $scope.error = true;
            });

        }, function () {
          $scope.error = true;
        }
      );

      $scope.approve = function () {
        let selectedDocs = $scope.docs.filter(val => val.isSelected).map(val => val.id);

        if (selectedDocs.length) {
          let requestObject = {
            'docIds': selectedDocs,
            'requestors': {
              'reqId': '2',
              'reqName': 'ABN'
            }
          };

          //http://172.16.23.143:8080/documents

          $http.post('https://webapisecuredbb.azurewebsites.net/documents/approve', requestObject)
            .then(function (success) {
              $scope.processed = true;

              $timeout(function () {
                $location.path('/success');
              }, 2000);
            }, function () {
              $scope.error = true;
            });
        }
      }
    }]);
