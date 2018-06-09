angular.module('app.confirmationController',[])
    .controller('confirmationController',['$scope','$timeout','$location', '$http','$window', function($scope, $timeout, $location, $http, $window){
    
    $scope.error = false;
    $scope.processed = false;
    var token = $window.sessionStorage.getItem("token");
    var config = {
        headers : {'Content-Type': 'application/json',
        'Authorization' : 'DirectLogin token=\"' + token + '\"'
      }}

    $http.get('https://beyondbanking.openbankproject.com/obp/v3.0.0/users/current',config).then(
        function(success){
            var userId = success.data.token;
            $http.get('https://webapisecuredbb.azurewebsites.net/user/:token/documents', userId).then(function(success){
                $scope.docs = success.data;
            }, function(error){
                $scope.error = true;
            })

        }, function(error){
            $scope.error = true;
        }
    );

    $scope.approve = function(){
        $scope.processed = true;

        $timeout( function(){
            $location.path('/success');
        }, 2000 );
    }

}]);