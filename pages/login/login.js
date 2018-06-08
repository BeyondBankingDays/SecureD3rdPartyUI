app.controller('loginController',['$scope','$timeout','$location', function($scope, $timeout, $location){

    $scope.goToConfirmation = function(){
        $location.path('/confirmation');
    }

}]);