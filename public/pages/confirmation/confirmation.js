angular.module('app.confirmationController', [])
  .controller('confirmationController', ['$scope', '$timeout', '$location', '$http', '$window',
    function ($scope, $timeout, $location, $http, $window) {
      $scope.error = false;
      $scope.processed = false;
      let config = {
        'headers': {
          'Content-Type': 'application/json',
          'Authorization': 'DirectLogin token=\"' + $window.sessionStorage.getItem('token') + '\"'}
      };
      $http.get('https://beyondbanking.openbankproject.com/obp/v3.0.0/users/current', config)
        .then(function (success) {
          $http.get('https://webapisecuredbb.azurewebsites.net/user/' + success.data.user_id + '/documents')
            .then(function (success) {
              $scope.docs = success.data;
            }, function () { $scope.error = true; });
        }, function () { $scope.error = true; }
      );

      $scope.approve = function () {
        let selectedDocs = $scope.docs.filter(val => val.isSelected).map(val => val.id);
        if (selectedDocs.length) {
          $http.post('https://webapisecuredbb.azurewebsites.net/documents/approve', getRequestObject(selectedDocs))
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

function getRequestObject(selectedDocs){
  return {
    'docIds': selectedDocs,
    'requestors': {
      'reqId': '2',
      'reqName': 'ABN'
    }
  };
}